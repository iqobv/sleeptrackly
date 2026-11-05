import {
	Challenge,
	ChallengeStatus,
	ChallengeTask,
	ChallengeTaskStatus,
	ChallengeTranslation,
	ChallengeType,
	SleepEntry,
	UserChallenge,
} from '@generated/prisma/client';
import { PrismaService } from '@infra/prisma/prisma.service';
import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { prismaMock } from '@libs/prisma/prisma.mock';
import { partialMock } from '@libs/utils/mock-helper.util';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@sentry/nestjs';
import { Job } from 'bullmq';
import { mock, mockReset } from 'jest-mock-extended';
import { ChallengePayloadDto } from '../dto/challenge-payload.dto';
import { ChallengeActionService } from '../services/challenge-action.service';
import { ChallengeProcessor } from './challenge.processor';

type UserChallengeWithRelations = Omit<UserChallenge, 'challenge' | 'user'> & {
	challenge: Partial<Challenge> & {
		translations?: Partial<ChallengeTranslation[]>;
	};
	user: Partial<User>;
	challengeTasks: ChallengeTask[];
};

describe('ChallengeProcessor', () => {
	let processor: ChallengeProcessor;
	let challengeActionService = mock<ChallengeActionService>();

	const userId = 'user-123';
	const sleepEntryId = 'sleep-123';
	const dateForChart = '2026-10-15';

	const defaultJob = {
		data: { sleepEntryId, userId },
	} as Job<ChallengePayloadDto>;

	const defaultSleepEntry: SleepEntry = {
		id: sleepEntryId,
		userId,
		isVerified: true,
		dateForChart,
		sleepDuration: 30000,
		sleepStart: new Date('2026-10-15T01:00:00.000Z'),
		sleepEnd: new Date('2026-10-15T08:00:00.000Z'),
		timezone: 'UTC',
		createdAt: new Date(),
		updatedAt: new Date(),
		rating: 4,
	};

	const defaultChallengeTask: ChallengeTask = {
		id: 'task-123',
		date: dateForChart,
		status: ChallengeTaskStatus.PENDING,
		completedAt: null,
		userChallengeId: 'uc-123',
		createdAt: new Date(),
		updatedAt: new Date(),
		sleepEntryId,
	};

	const defaultUserChallenge: UserChallengeWithRelations =
		partialMock<UserChallengeWithRelations>({
			id: 'uc-123',
			userId,
			status: ChallengeStatus.ACTIVE,
			startDate: '2026-10-10',
			challengeTasks: [defaultChallengeTask],
			challenge: {
				id: 'challenge-1',
				type: ChallengeType.SLEEP_DURATION,
				metadata: { minDurationMinutes: 420 },
				translations: [],
			},
			user: {
				id: userId,
				timezone: 'UTC',
			},
		});

	beforeEach(async () => {
		mockReset(prismaMock);
		mockReset(challengeActionService);

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ChallengeProcessor,
				{ provide: PrismaService, useValue: prismaMock },
				{ provide: ChallengeActionService, useValue: challengeActionService },
			],
		}).compile();

		processor = module.get<ChallengeProcessor>(ChallengeProcessor);
	});

	describe('process', () => {
		it('should throw NotFoundException if sleep entry does not exist', async () => {
			prismaMock.sleepEntry.findFirst.mockResolvedValue(null);

			await expect(processor.process(defaultJob)).rejects.toThrow(
				new NotFoundException(ERROR_MESSAGES.SLEEP_ENTRY.NOT_FOUND),
			);
		});

		it('should return early if sleep entry is not verified', async () => {
			prismaMock.sleepEntry.findFirst.mockResolvedValue({
				...defaultSleepEntry,
				isVerified: false,
			});

			await processor.process(defaultJob);

			expect(prismaMock.userChallenge.findMany).not.toHaveBeenCalled();
		});

		it('should return early if there are no active challenges', async () => {
			prismaMock.sleepEntry.findFirst.mockResolvedValue(defaultSleepEntry);
			prismaMock.userChallenge.findMany.mockResolvedValue([]);

			await processor.process(defaultJob);

			expect(
				challengeActionService.completeChallengeTask,
			).not.toHaveBeenCalled();
			expect(challengeActionService.failChallengeTask).not.toHaveBeenCalled();
		});

		it('should complete task if validation passes (SLEEP_DURATION)', async () => {
			prismaMock.sleepEntry.findFirst.mockResolvedValue(defaultSleepEntry);
			prismaMock.userChallenge.findMany.mockResolvedValue([
				defaultUserChallenge,
			]);

			await processor.process(defaultJob);

			expect(challengeActionService.completeChallengeTask).toHaveBeenCalledWith(
				{
					userChallenge: defaultUserChallenge,
					taskId: defaultChallengeTask.id,
					sleepEntryId,
					isRecovery: false,
				},
			);
			expect(challengeActionService.failChallengeTask).not.toHaveBeenCalled();
		});

		it('should fail task if validation fails (SLEEP_DURATION)', async () => {
			prismaMock.sleepEntry.findFirst.mockResolvedValue({
				...defaultSleepEntry,
				sleepDuration: 300,
			});
			prismaMock.userChallenge.findMany.mockResolvedValue([
				defaultUserChallenge,
			]);

			await processor.process(defaultJob);

			expect(challengeActionService.failChallengeTask).toHaveBeenCalledWith(
				{ ...defaultChallengeTask, userChallenge: defaultUserChallenge },
				'CONDITION_FAILED',
			);
			expect(
				challengeActionService.completeChallengeTask,
			).not.toHaveBeenCalled();
		});
	});

	describe('BEDTIME_VARIANCE validation logic', () => {
		const varianceChallenge: UserChallengeWithRelations = {
			...defaultUserChallenge,
			challenge: {
				...defaultUserChallenge.challenge,
				type: ChallengeType.BEDTIME_VARIANCE,
				metadata: { maxVarianceMinutes: 60 },
			},
		};

		it('should pass automatically on the first day of the challenge', async () => {
			const firstDayChallenge = {
				...varianceChallenge,
				startDate: dateForChart,
			};
			prismaMock.sleepEntry.findFirst.mockResolvedValue(defaultSleepEntry);
			prismaMock.userChallenge.findMany.mockResolvedValue([firstDayChallenge]);

			await processor.process(defaultJob);

			expect(challengeActionService.completeChallengeTask).toHaveBeenCalled();
		});

		it('should pass automatically if there is no previous sleep entry', async () => {
			prismaMock.sleepEntry.findFirst
				.mockResolvedValueOnce(defaultSleepEntry)
				.mockResolvedValueOnce(null);
			prismaMock.userChallenge.findMany.mockResolvedValue([varianceChallenge]);

			await processor.process(defaultJob);

			expect(challengeActionService.completeChallengeTask).toHaveBeenCalled();
		});

		it('should pass if bedtime variance is within the allowed limit', async () => {
			prismaMock.sleepEntry.findFirst
				.mockResolvedValueOnce(defaultSleepEntry)
				.mockResolvedValueOnce({
					...defaultSleepEntry,
					sleepStart: new Date('2026-10-14T01:30:00.000Z'),
				});
			prismaMock.userChallenge.findMany.mockResolvedValue([varianceChallenge]);

			await processor.process(defaultJob);

			expect(challengeActionService.completeChallengeTask).toHaveBeenCalled();
		});

		it('should fail if bedtime variance exceeds the allowed limit', async () => {
			prismaMock.sleepEntry.findFirst
				.mockResolvedValueOnce(defaultSleepEntry)
				.mockResolvedValueOnce({
					...defaultSleepEntry,
					sleepStart: new Date('2026-10-14T03:00:00.000Z'),
				});
			prismaMock.userChallenge.findMany.mockResolvedValue([varianceChallenge]);

			await processor.process(defaultJob);

			expect(challengeActionService.failChallengeTask).toHaveBeenCalled();
		});
	});

	describe('Time Consistency validation logic', () => {
		it('should pass BEDTIME_CONSISTENCY if within margin', async () => {
			const bedtimeChallenge: UserChallengeWithRelations = {
				...defaultUserChallenge,
				challenge: {
					...defaultUserChallenge.challenge,
					type: ChallengeType.BEDTIME_CONSISTENCY,
					metadata: { targetTime: '04:00', marginMinutes: 30 },
				},
			};

			prismaMock.sleepEntry.findFirst.mockResolvedValue({
				...defaultSleepEntry,
				sleepStart: new Date('2026-10-15T04:15:00.000Z'),
			});
			prismaMock.userChallenge.findMany.mockResolvedValue([bedtimeChallenge]);

			await processor.process(defaultJob);

			expect(challengeActionService.completeChallengeTask).toHaveBeenCalled();
		});

		it('should fail WAKE_TIME_CONSISTENCY if outside margin', async () => {
			const wakeTimeChallenge: UserChallengeWithRelations = {
				...defaultUserChallenge,
				challenge: {
					...defaultUserChallenge.challenge,
					type: ChallengeType.WAKE_TIME_CONSISTENCY,
					metadata: { targetTime: '07:00', marginMinutes: 30 },
				},
			};

			prismaMock.sleepEntry.findFirst.mockResolvedValue({
				...defaultSleepEntry,
				sleepEnd: new Date('2026-10-15T08:00:00.000Z'),
			});
			prismaMock.userChallenge.findMany.mockResolvedValue([wakeTimeChallenge]);

			await processor.process(defaultJob);

			expect(challengeActionService.failChallengeTask).toHaveBeenCalled();
		});
	});
});
