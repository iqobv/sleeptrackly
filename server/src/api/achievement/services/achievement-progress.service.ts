import { CoinTransactionService } from '@api/coin-transaction/coin-transaction.service';
import { NotificationService } from '@api/notification/notification.service';
import { UserInventoryService } from '@api/user-inventory/user-inventory.service';
import {
	AchievementType,
	AcquiredFrom,
	CoinTransactionType,
	NotificationType,
} from '@generated/prisma/enums';
import { PrismaService } from '@infra/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { AchievementDto } from '../dto/achievement.dto';

@Injectable()
export class AchievementProgressService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly coinTransactionService: CoinTransactionService,
		private readonly userInventoryService: UserInventoryService,
		private readonly notificationService: NotificationService,
	) {}

	public async checkProgress(
		userId: string,
		type: AchievementType,
	): Promise<void> {
		const userAchievements = await this.prismaService.userAchievement.findMany({
			where: { userId },
			select: { achievementId: true },
		});

		const userAchievementsIds = userAchievements.map((ua) => ua.achievementId);

		const pendingAchievements = await this.prismaService.achievement.findMany({
			where: {
				type,
				id: { notIn: userAchievementsIds },
			},
		});

		if (pendingAchievements.length === 0) return;

		const currentValue = await this.getCurrentValue(userId, type);

		if (currentValue === 0) return;

		for (const achievement of pendingAchievements) {
			if (currentValue >= achievement.targetValue) {
				await this.awardAchievement(userId, achievement.id);
			}
		}
	}

	private async getCurrentValue(
		userId: string,
		type: AchievementType,
	): Promise<number> {
		switch (type) {
			case AchievementType.SLEEP_COUNT:
				return await this.prismaService.sleepEntry.count({
					where: { userId, isVerified: true },
				});
			case AchievementType.ITEMS_PURCHASED:
				return await this.prismaService.purchaseHistory.count({
					where: { userId },
				});
			case AchievementType.FRIENDS_COUNT:
				return await this.prismaService.friendship.count({
					where: {
						OR: [{ addresseeId: userId }, { requesterId: userId }],
						status: 'ACCEPTED',
					},
				});
			case AchievementType.CHALLENGES_COMPLETED:
				return await this.prismaService.userChallenge.count({
					where: { userId, status: 'COMPLETED' },
				});
			case AchievementType.CHALLENGES_TASKS_COMPLETED:
				return await this.prismaService.userChallenge.count({
					where: { userId, challengeTasks: { every: { isCompleted: true } } },
				});
			default:
				return 0;
		}
	}

	private async awardAchievement(
		userId: string,
		achievementId: string,
	): Promise<AchievementDto | null> {
		const achievement = await this.prismaService.$transaction(async (tx) => {
			const achievement = await tx.achievement.findUnique({
				where: { id: achievementId },
			});

			if (!achievement) return null;

			await tx.userAchievement.create({
				data: {
					userId,
					achievementId,
				},
			});

			if (achievement.rewardCoins > 0) {
				await this.coinTransactionService.createTransaction(
					{
						userId,
						amount: achievement.rewardCoins,
						transactionType: CoinTransactionType.ACHIEVEMENT,
						referenceId: achievement.id,
					},
					tx,
				);
			}

			if (achievement.rewardProductId) {
				const product = await tx.product.findUnique({
					where: { id: achievement.rewardProductId },
					select: {
						itemId: true,
						bundle: { select: { items: { select: { itemId: true } } } },
					},
				});

				const rewardItemIds = product?.itemId
					? [product.itemId]
					: (product?.bundle?.items.map((bi) => bi.itemId) ?? []);

				if (rewardItemIds.length > 0) {
					const owned = await this.userInventoryService.getOwnedItemIds(
						userId,
						rewardItemIds,
						tx,
					);
					const ownedItemIds = new Set(owned.map((o) => o.itemId));

					const itemsToAdd = rewardItemIds.filter(
						(id) => !ownedItemIds.has(id),
					);

					if (itemsToAdd.length > 0) {
						await this.userInventoryService.bulkAddItemsToInventory(
							itemsToAdd.map((itemId) => ({
								userId,
								acquiredAt: new Date(),
								acquiredFrom: AcquiredFrom.REWARD,
								itemId,
							})),
							tx,
						);
					}
				}
			}

			return achievement;
		});

		if (achievement) {
			const userSettings =
				await this.prismaService.userNotificationSettings.findUnique({
					where: { userId },
				});

			if (userSettings && userSettings.isAchievementUnlockedEnabled) {
				await this.notificationService.create({
					userId,
					achievementId,
					title: 'Achievement Unlocked!',
					body: `You have unlocked new achievement.`,
					type: NotificationType.ACHIEVEMENT_UNLOCKED,
				});
			}
		}

		return achievement;
	}
}
