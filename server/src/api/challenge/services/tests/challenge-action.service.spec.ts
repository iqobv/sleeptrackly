import { AchievementsPublisherService } from '@api/achievement/services/achievements-publisher.service';
import { CompleteChallengeTaskDto } from '@api/challenge/dto/complete-challenge-task.dto';
import { ChallengeFailReason } from '@api/challenge/types/challenge-fail-reason.types';
import { TaskPayload } from '@api/challenge/types/task-payload.types';
import { CoinTransactionService } from '@api/coin-transaction/coin-transaction.service';
import { NotificationPublisherService } from '@api/notification/services/notification-publisher.service';
import { RewardProductService } from '@api/reward/services/reward-product.service';
import { StatisticsPublisherService } from '@api/statistics/services/statistics-publisher.service';
import { UserStatsService } from '@api/user-stats/user-stats.service';
import { ChallengeTask, User } from '@generated/prisma/client';
import {
	AcquiredFrom,
	ChallengeStatus,
	ChallengeTaskStatus,
	CoinTransactionType,
	NotificationType,
} from '@generated/prisma/enums';
import { PrismaService } from '@infra/prisma/prisma.service';
import { prismaMock } from '@libs/prisma/prisma.mock';
import { partialMock } from '@libs/utils/mock-helper.util';
import { Test, TestingModule } from '@nestjs/testing';
import { mock, mockReset } from 'jest-mock-extended';
import { ChallengeActionService } from '../challenge-action.service';

describe('ChallengeActionService', () => {
	let service: ChallengeActionService;
	const notificationPublisherService = mock<NotificationPublisherService>();
	const coinTransactionService = mock<CoinTransactionService>();
	const rewardProductService = mock<RewardProductService>();
	const achievementsPublisherService = mock<AchievementsPublisherService>();
	const userStatsService = mock<UserStatsService>();
	const statisticsPublisherService = mock<StatisticsPublisherService>();

	const userId = 'user-123';
	const taskId = 'task-123';
	const userChallengeId = 'uc-123';
	const challengeId = 'c-123';

	const mockTaskPayload = {
		id: taskId,
		userChallengeId,
		userChallenge: {
			userId,
			challengeId,
			usedRecoveries: 1,
			challenge: {
				maxRecoveries: 3,
				translations: [{ title: 'Sleep Test' }],
			},
		},
	} as unknown as TaskPayload;

	const mockCompleteDto: CompleteChallengeTaskDto = {
		taskId,
		sleepEntryId: 'sleep-123',
		isRecovery: false,
		userChallenge: {
			id: userChallengeId,
			userId,
			challengeId,
			status: ChallengeStatus.ACTIVE,
			progress: 1,
			usedRecoveries: 0,
			createdAt: new Date(),
			updatedAt: new Date(),
			completedAt: null,
			startDate: '2026-10-01',
			endDate: '2026-10-10',
			frozenAt: null,
			challenge: {
				id: challengeId,
				dailyRewardCoins: 10,
				rewardCoins: 100,
				rewardProductId: 'prod-123',
				createdAt: new Date(),
				updatedAt: new Date(),
				type: 'SLEEP_DURATION',
				tier: 'TIER_1',
				availableFrom: null,
				availableTo: null,
				visibility: 'PUBLISHED',
				durationDays: 7,
				targetValue: 8,
				maxRecoveries: 3,
				metadata: null,
			},
		},
	};

	beforeEach(async () => {
		mockReset(prismaMock);
		mockReset(notificationPublisherService);
		mockReset(coinTransactionService);
		mockReset(rewardProductService);
		mockReset(achievementsPublisherService);
		mockReset(userStatsService);
		mockReset(statisticsPublisherService);

		prismaMock.$transaction.mockImplementation(async (cb) => cb(prismaMock));

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ChallengeActionService,
				{ provide: PrismaService, useValue: prismaMock },
				{
					provide: NotificationPublisherService,
					useValue: notificationPublisherService,
				},
				{ provide: CoinTransactionService, useValue: coinTransactionService },
				{ provide: RewardProductService, useValue: rewardProductService },
				{
					provide: AchievementsPublisherService,
					useValue: achievementsPublisherService,
				},
				{
					provide: UserStatsService,
					useValue: userStatsService,
				},
				{
					provide: StatisticsPublisherService,
					useValue: statisticsPublisherService,
				},
			],
		}).compile();

		service = module.get<ChallengeActionService>(ChallengeActionService);
	});

	describe('failChallengeTask', () => {
		it('should freeze challenge if recoveries are left and reason is TIMEOUT', async () => {
			await service.failChallengeTask(mockTaskPayload, 'TIMEOUT');

			expect(prismaMock.challengeTask.update).toHaveBeenCalledWith({
				where: { id: taskId },
				data: { status: ChallengeTaskStatus.FAILED },
			});

			expect(prismaMock.userChallenge.update).toHaveBeenCalledWith({
				where: { id: userChallengeId },
				data: {
					status: ChallengeStatus.FROZEN,
					frozenAt: expect.any(Date),
				},
			});

			expect(notificationPublisherService.dispatchCreate).toHaveBeenCalledWith(
				expect.objectContaining({
					type: NotificationType.CHALLENGE_FROZEN,
					userId,
					meta: {
						reason: ChallengeFailReason.CONDITION_FAILED,
						recoveriesLeft: 2,
					},
					challengeId,
				}),
			);
		});

		it('should freeze challenge if recoveries are left and reason is CONDITION_FAILED', async () => {
			await service.failChallengeTask(mockTaskPayload, 'CONDITION_FAILED');

			expect(notificationPublisherService.dispatchCreate).toHaveBeenCalledWith(
				expect.objectContaining({
					type: NotificationType.CHALLENGE_FROZEN,
					userId,
					challengeId,
					meta: {
						reason: ChallengeFailReason.CONDITION_FAILED,
						recoveriesLeft: 2,
					},
				}),
			);
		});

		it('should fail challenge completely if no recoveries are left', async () => {
			const payloadWithoutRecoveries = {
				...mockTaskPayload,
				userChallenge: {
					...mockTaskPayload.userChallenge,
					usedRecoveries: 3,
				},
			} as unknown as TaskPayload;

			await service.failChallengeTask(payloadWithoutRecoveries, 'TIMEOUT');

			expect(prismaMock.userChallenge.update).toHaveBeenCalledWith({
				where: { id: userChallengeId },
				data: { status: ChallengeStatus.FAILED, frozenAt: null },
			});

			expect(notificationPublisherService.dispatchCreate).toHaveBeenCalledWith(
				expect.objectContaining({
					type: NotificationType.CHALLENGE_FAILED,
					userId,
					challengeId,
					meta: { reason: ChallengeFailReason.RESTORE_LIMIT_EXCEEDED },
				}),
			);
		});
	});

	describe('completeChallengeTask', () => {
		it('should complete standard task, issue daily rewards, and keep challenge ACTIVE if pending tasks exist', async () => {
			prismaMock.challengeTask.findMany.mockResolvedValue([
				partialMock<ChallengeTask>({
					id: 'task-456',
					status: ChallengeTaskStatus.PENDING,
				}),
			]);

			const result = await service.completeChallengeTask(mockCompleteDto);

			expect(result.isChallengeCompleted).toBe(false);

			expect(prismaMock.challengeTask.update).toHaveBeenCalledWith({
				where: { id: taskId },
				data: {
					status: ChallengeStatus.COMPLETED,
					sleepEntryId: 'sleep-123',
				},
			});

			expect(prismaMock.userChallenge.update).toHaveBeenCalledWith(
				expect.objectContaining({
					where: { id: userChallengeId },
					data: { progress: { increment: 1 } },
				}),
			);

			expect(coinTransactionService.createTransaction).toHaveBeenCalledWith({
				amount: 10,
				transactionType: CoinTransactionType.CHALLENGE_TASK_REWARD,
				userId,
				referenceId: taskId,
			});

			expect(prismaMock.userChallenge.update).toHaveBeenCalledWith({
				where: { id: userChallengeId },
				data: { status: ChallengeStatus.ACTIVE, frozenAt: null },
			});

			expect(
				achievementsPublisherService.dispatchProgressCheck,
			).toHaveBeenCalledTimes(2);
		});

		it('should set challenge status to FROZEN if there are failed tasks remaining', async () => {
			prismaMock.challengeTask.findMany.mockResolvedValue([
				partialMock<ChallengeTask>({
					id: 'task-456',
					status: ChallengeTaskStatus.FAILED,
				}),
			]);

			await service.completeChallengeTask(mockCompleteDto);

			expect(prismaMock.userChallenge.update).toHaveBeenCalledWith({
				where: { id: userChallengeId },
				data: { status: ChallengeStatus.FROZEN },
			});
		});

		it('should complete challenge, issue final rewards, and grant product if no pending or failed tasks remain', async () => {
			prismaMock.challengeTask.findMany.mockResolvedValue([]);

			const result = await service.completeChallengeTask(mockCompleteDto);

			expect(result.isChallengeCompleted).toBe(true);

			expect(prismaMock.userChallenge.update).toHaveBeenCalledWith({
				where: { id: userChallengeId },
				data: { status: ChallengeStatus.COMPLETED, frozenAt: null },
			});

			expect(coinTransactionService.createTransaction).toHaveBeenCalledWith({
				amount: 100,
				transactionType: CoinTransactionType.CHALLENGE_REWARD,
				userId,
				referenceId: userChallengeId,
			});

			expect(rewardProductService.rewardProduct).toHaveBeenCalledWith(
				'prod-123',
				userId,
				AcquiredFrom.CHALLENGE_REWARD,
			);
		});

		it('should handle task recovery correctly without issuing daily rewards', async () => {
			prismaMock.challengeTask.findMany.mockResolvedValue([
				partialMock<ChallengeTask>({
					id: 'task-456',
					status: ChallengeTaskStatus.PENDING,
				}),
			]);
			prismaMock.user.findUnique.mockResolvedValue(
				partialMock<User>({
					timezone: 'UTC',
				}),
			);

			const recoveryDto = { ...mockCompleteDto, isRecovery: true };

			const result = await service.completeChallengeTask(recoveryDto);

			expect(result.isChallengeCompleted).toBe(false);

			expect(prismaMock.challengeTask.update).toHaveBeenCalledWith({
				where: { id: taskId },
				data: {
					status: ChallengeTaskStatus.RECOVERED,
					sleepEntryId: 'sleep-123',
					completedAt: expect.any(Date),
				},
			});

			expect(prismaMock.userChallenge.update).toHaveBeenCalledWith(
				expect.objectContaining({
					where: { id: userChallengeId },
					data: expect.objectContaining({
						progress: { increment: 1 },
						usedRecoveries: { increment: 1 },
					}),
				}),
			);

			expect(prismaMock.userStats.update).toHaveBeenCalledWith({
				where: { userId },
				data: {
					challengeRestores: { decrement: 1 },
				},
			});

			expect(coinTransactionService.createTransaction).not.toHaveBeenCalledWith(
				expect.objectContaining({
					transactionType: CoinTransactionType.CHALLENGE_TASK_REWARD,
				}),
			);
		});
	});
});
