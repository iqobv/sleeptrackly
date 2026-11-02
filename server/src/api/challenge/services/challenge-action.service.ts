import { AchievementsPublisherService } from '@api/achievement/services/achievements-publisher.service';
import { CoinTransactionService } from '@api/coin-transaction/coin-transaction.service';
import { NotificationPublisherService } from '@api/notification/services/notification-publisher.service';
import { RewardProductService } from '@api/reward/services/reward-product.service';
import { UserStatsService } from '@api/user-stats/user-stats.service';
import {
	AchievementType,
	AcquiredFrom,
	ChallengeStatus,
	ChallengeTaskStatus,
	CoinTransactionType,
	NotificationType,
} from '@generated/prisma/enums';
import { PrismaService } from '@infra/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CompleteChallengeTaskDto } from '../dto/complete-challenge-task.dto';
import { TaskFailReason } from '../types/task-fail-reason.types';
import { TaskPayload } from '../types/task-payload.types';

@Injectable()
export class ChallengeActionService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly notificationPublisherService: NotificationPublisherService,
		private readonly coinTransactionService: CoinTransactionService,
		private readonly rewardProductService: RewardProductService,
		private readonly achievementsPublisherService: AchievementsPublisherService,
		private readonly userStatsService: UserStatsService,
	) {}

	public async failChallengeTask(
		task: TaskPayload,
		reason: TaskFailReason,
	): Promise<void> {
		await this.prismaService.$transaction(async (tx) => {
			await tx.challengeTask.update({
				where: { id: task.id },
				data: { status: ChallengeTaskStatus.FAILED },
			});

			const usedRecoveries = task.userChallenge.usedRecoveries;
			const maxRecoveries = task.userChallenge.challenge.maxRecoveries;

			const hasRecoveriesLeft = usedRecoveries < maxRecoveries;
			const recoveriesLeft = maxRecoveries - usedRecoveries;

			const title = task.userChallenge.challenge.translations[0].title;

			const reasonText =
				reason === 'TIMEOUT'
					? 'you missed a task'
					: "your sleep didn't meet the conditions";

			if (hasRecoveriesLeft) {
				await tx.userChallenge.update({
					where: { id: task.userChallengeId },
					data: { status: ChallengeStatus.FROZEN, frozenAt: new Date() },
				});

				await this.notificationPublisherService.dispatchCreate({
					userId: task.userChallenge.userId,
					type: NotificationType.CHALLENGE_FROZEN,
					title: 'Challenge Frozen',
					body: `Your challenge "${title}" has been frozen because ${reasonText}. You have ${recoveriesLeft} recoveries left.`,
					challengeId: task.userChallenge.challengeId,
				});
			} else {
				await tx.userChallenge.update({
					where: { id: task.userChallengeId },
					data: { status: ChallengeStatus.FAILED, frozenAt: null },
				});

				await this.notificationPublisherService.dispatchCreate({
					userId: task.userChallenge.userId,
					type: NotificationType.CHALLENGE_FAILED,
					title: 'Challenge Failed',
					body: `Your challenge "${title}" has failed because you missed a task and have no recoveries left.`,
					challengeId: task.userChallenge.challengeId,
				});
			}
		});
	}

	public async completeChallengeTask(
		dto: CompleteChallengeTaskDto,
	): Promise<{ isChallengeCompleted: boolean }> {
		const { isRecovery, taskId, userChallenge, sleepEntryId } = dto;
		const userId = userChallenge.userId;

		let isChallengeCompleted = false;

		await this.prismaService.$transaction(async (tx) => {
			await tx.challengeTask.update({
				where: { id: taskId },
				data: {
					status: isRecovery
						? ChallengeTaskStatus.RECOVERED
						: ChallengeStatus.COMPLETED,
					...(sleepEntryId && { sleepEntryId }),
					...(isRecovery && { completedAt: new Date() }),
				},
			});

			await tx.userChallenge.update({
				where: { id: userChallenge.id },
				data: {
					progress: { increment: 1 },
					...(isRecovery && { usedRecoveries: { increment: 1 } }),
				},
			});

			if (isRecovery) {
				await tx.userStats.update({
					where: { userId },
					data: {
						challengeRestores: { decrement: 1 },
					},
				});

				const user = await tx.user.findUnique({
					where: { id: userId },
					select: {
						timezone: true,
					},
				});

				await this.userStatsService.syncUserStats(
					userId,
					user?.timezone ?? 'UTC',
					undefined,
				);
			}

			if (!isRecovery && userChallenge.challenge.dailyRewardCoins > 0) {
				await this.coinTransactionService.createTransaction({
					amount: userChallenge.challenge.dailyRewardCoins,
					transactionType: CoinTransactionType.CHALLENGE_TASK_REWARD,
					userId,
					referenceId: taskId,
				});
			}

			const pendingOrFailedTasks = await tx.challengeTask.findMany({
				where: {
					userChallengeId: userChallenge.id,
					status: {
						in: [ChallengeTaskStatus.PENDING, ChallengeTaskStatus.FAILED],
					},
				},
			});

			if (pendingOrFailedTasks.length === 0) {
				isChallengeCompleted = true;

				await tx.userChallenge.update({
					where: { id: userChallenge.id },
					data: { status: ChallengeStatus.COMPLETED, frozenAt: null },
				});

				if (userChallenge.challenge.rewardCoins > 0) {
					await this.coinTransactionService.createTransaction({
						amount: userChallenge.challenge.rewardCoins,
						transactionType: CoinTransactionType.CHALLENGE_REWARD,
						userId,
						referenceId: userChallenge.id,
					});
				}

				if (userChallenge.challenge.rewardProductId) {
					await this.rewardProductService.rewardProduct(
						userChallenge.challenge.rewardProductId,
						userId,
						AcquiredFrom.CHALLENGE_REWARD,
					);
				}
			} else {
				const hasFailedTasks = pendingOrFailedTasks.some(
					(task) => task.status === ChallengeTaskStatus.FAILED,
				);

				const nextStatus = hasFailedTasks
					? ChallengeStatus.FROZEN
					: ChallengeStatus.ACTIVE;

				await tx.userChallenge.update({
					where: { id: userChallenge.id },
					data: {
						status: nextStatus,
						...(nextStatus === ChallengeStatus.ACTIVE && { frozenAt: null }),
					},
				});
			}
		});

		await this.achievementsPublisherService.dispatchProgressCheck({
			type: AchievementType.CHALLENGES_TASKS_COMPLETED,
			userId,
		});

		await this.achievementsPublisherService.dispatchProgressCheck({
			type: AchievementType.CHALLENGES_COMPLETED,
			userId,
		});

		return { isChallengeCompleted };
	}
}
