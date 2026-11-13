import { CoinTransactionService } from '@api/coin-transaction/coin-transaction.service';
import { NotificationPublisherService } from '@api/notification/services/notification-publisher.service';
import { StatisticsPublisherService } from '@api/statistics/services/statistics-publisher.service';
import { StatisticsType } from '@api/statistics/types/statistics-type.types';
import { UserInventoryService } from '@api/user-inventory/user-inventory.service';
import {
	AchievementType,
	AcquiredFrom,
	ChallengeStatus,
	ChallengeTaskStatus,
	CoinTransactionType,
	FriendshipStatus,
	NotificationType,
	Platform,
	StreakStatus,
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
		private readonly notificationPublisherService: NotificationPublisherService,
		private readonly statisticsPublisherService: StatisticsPublisherService,
	) {}

	public async checkProgress(
		userId: string,
		type: AchievementType,
		platform?: Platform,
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
				await this.awardAchievement(userId, achievement.id, platform);
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
						status: FriendshipStatus.ACCEPTED,
					},
				});
			case AchievementType.CHALLENGES_COMPLETED:
				return await this.prismaService.userChallenge.count({
					where: { userId, status: ChallengeStatus.COMPLETED },
				});
			case AchievementType.CHALLENGES_TASKS_COMPLETED:
				return await this.prismaService.userChallenge.count({
					where: {
						userId,
						challengeTasks: {
							every: { status: ChallengeTaskStatus.COMPLETED },
						},
					},
				});
			case AchievementType.STREAK:
				const activeStreak = await this.prismaService.streak.findFirst({
					where: { userId, status: StreakStatus.ACTIVE },
				});

				return activeStreak ? activeStreak.length : 0;
			default:
				return 0;
		}
	}

	private async awardAchievement(
		userId: string,
		achievementId: string,
		platform?: Platform,
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

			await this.statisticsPublisherService.dispatchStatisticsProcessing({
				type: StatisticsType.ACHIEVEMENT_UNLOCKED,
				data: { userId, entityId: achievement.id, platform },
			});

			return achievement;
		});

		if (achievement) {
			const userSettings =
				await this.prismaService.userNotificationSettings.findUnique({
					where: { userId },
				});

			if (userSettings && userSettings.isAchievementUnlockedEnabled) {
				await this.notificationPublisherService.dispatchCreate({
					userId,
					achievementId,
					type: NotificationType.ACHIEVEMENT_UNLOCKED,
				});
			}
		}

		return achievement;
	}
}
