import {
	ChallengeStatus,
	ChallengeTaskStatus,
	ChallengeType,
} from '@generated/prisma/client';
import { PrismaService } from '@infra/prisma/prisma.service';
import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Job } from 'bullmq';
import { ChallengePayloadDto } from '../dto/challenge-payload.dto';
import { ChallengeActionService } from '../services/challenge-action.service';
import { ChallengeProcessor } from './challenge.processor';

type PrismaMock = {
	sleepEntry: { findFirst: jest.Mock };
	userChallenge: { findMany: jest.Mock };
};

type ChallengeActionMock = {
	completeChallengeTask: jest.Mock;
	failChallengeTask: jest.Mock;
};

describe('ChallengeProcessor', () => {
	let processor: ChallengeProcessor;
	let prismaService: PrismaMock;
	let challengeActionService: ChallengeActionMock;

	const userId = 'user-123';
	const sleepEntryId = 'sleep-123';
	const dateForChart = '2026-10-15';

	const defaultJob = {
		data: { sleepEntryId, userId },
	} as Job<ChallengePayloadDto>;

	const defaultSleepEntry = {
		id: sleepEntryId,
		userId,
		isVerified: true,
		dateForChart,
		sleepDuration: 30000,
		sleepStart: new Date('2026-10-15T01:00:00.000Z'),
		sleepEnd: new Date('2026-10-15T08:00:00.000Z'),
		timezone: 'UTC',
	};

	const defaultChallengeTask = {
		id: 'task-123',
		date: dateForChart,
		status: ChallengeTaskStatus.PENDING,
	};

	const defaultUserChallenge = {
		id: 'uc-123',
		userId,
		status: ChallengeStatus.ACTIVE,
		startDate: '2026-10-10',
		challengeTasks: [defaultChallengeTask],
		challenge: {
			type: ChallengeType.SLEEP_DURATION,
			metadata: { minDurationMinutes: 420 },
			translations: [],
		},
		user: {},
	};

	beforeEach(async () => {
		prismaService = {
			sleepEntry: { findFirst: jest.fn() },
			userChallenge: { findMany: jest.fn() },
		};

		challengeActionService = {
			completeChallengeTask: jest.fn(),
			failChallengeTask: jest.fn(),
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ChallengeProcessor,
				{ provide: PrismaService, useValue: prismaService },
				{ provide: ChallengeActionService, useValue: challengeActionService },
			],
		}).compile();

		processor = module.get<ChallengeProcessor>(ChallengeProcessor);
	});

	describe('process', () => {
		it('should throw NotFoundException if sleep entry does not exist', async () => {
			prismaService.sleepEntry.findFirst.mockResolvedValue(null);

			await expect(processor.process(defaultJob)).rejects.toThrow(
				new NotFoundException(ERROR_MESSAGES.SLEEP_ENTRY.NOT_FOUND),
			);
		});

		it('should return early if sleep entry is not verified', async () => {
			prismaService.sleepEntry.findFirst.mockResolvedValue({
				...defaultSleepEntry,
				isVerified: false,
			});

			await processor.process(defaultJob);

			expect(prismaService.userChallenge.findMany).not.toHaveBeenCalled();
		});

		it('should return early if there are no active challenges', async () => {
			prismaService.sleepEntry.findFirst.mockResolvedValue(defaultSleepEntry);
			prismaService.userChallenge.findMany.mockResolvedValue([]);

			await processor.process(defaultJob);

			expect(
				challengeActionService.completeChallengeTask,
			).not.toHaveBeenCalled();
			expect(challengeActionService.failChallengeTask).not.toHaveBeenCalled();
		});

		it('should complete task if validation passes (SLEEP_DURATION)', async () => {
			prismaService.sleepEntry.findFirst.mockResolvedValue(defaultSleepEntry);
			prismaService.userChallenge.findMany.mockResolvedValue([
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
			prismaService.sleepEntry.findFirst.mockResolvedValue({
				...defaultSleepEntry,
				sleepDuration: 300,
			});
			prismaService.userChallenge.findMany.mockResolvedValue([
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
		const varianceChallenge = {
			...defaultUserChallenge,
			challenge: {
				type: ChallengeType.BEDTIME_VARIANCE,
				metadata: { maxVarianceMinutes: 60 },
				translations: [],
			},
		};

		it('should pass automatically on the first day of the challenge', async () => {
			const firstDayChallenge = {
				...varianceChallenge,
				startDate: dateForChart,
			};
			prismaService.sleepEntry.findFirst.mockResolvedValue(defaultSleepEntry);
			prismaService.userChallenge.findMany.mockResolvedValue([
				firstDayChallenge,
			]);

			await processor.process(defaultJob);

			expect(challengeActionService.completeChallengeTask).toHaveBeenCalled();
		});

		it('should pass automatically if there is no previous sleep entry', async () => {
			prismaService.sleepEntry.findFirst.mockImplementation(
				async (args: { where: { id?: string; dateForChart?: string } }) => {
					if (args.where.id === sleepEntryId) return defaultSleepEntry;
					return null;
				},
			);
			prismaService.userChallenge.findMany.mockResolvedValue([
				varianceChallenge,
			]);

			await processor.process(defaultJob);

			expect(challengeActionService.completeChallengeTask).toHaveBeenCalled();
		});

		it('should pass if bedtime variance is within the allowed limit', async () => {
			prismaService.sleepEntry.findFirst.mockImplementation(
				async (args: { where: { id?: string; dateForChart?: string } }) => {
					if (args.where.id === sleepEntryId) return defaultSleepEntry;
					if (args.where.dateForChart === '2026-10-14') {
						return {
							...defaultSleepEntry,
							sleepStart: new Date('2026-10-14T01:30:00.000Z'),
						};
					}
					return null;
				},
			);
			prismaService.userChallenge.findMany.mockResolvedValue([
				varianceChallenge,
			]);

			await processor.process(defaultJob);

			expect(challengeActionService.completeChallengeTask).toHaveBeenCalled();
		});

		it('should fail if bedtime variance exceeds the allowed limit', async () => {
			prismaService.sleepEntry.findFirst.mockImplementation(
				async (args: { where: { id?: string; dateForChart?: string } }) => {
					if (args.where.id === sleepEntryId) return defaultSleepEntry;
					if (args.where.dateForChart === '2026-10-14') {
						return {
							...defaultSleepEntry,
							sleepStart: new Date('2026-10-14T03:00:00.000Z'),
						};
					}
					return null;
				},
			);
			prismaService.userChallenge.findMany.mockResolvedValue([
				varianceChallenge,
			]);

			await processor.process(defaultJob);

			expect(challengeActionService.failChallengeTask).toHaveBeenCalled();
		});
	});

	describe('Time Consistency validation logic', () => {
		it('should pass BEDTIME_CONSISTENCY if within margin', async () => {
			const bedtimeChallenge = {
				...defaultUserChallenge,
				challenge: {
					type: ChallengeType.BEDTIME_CONSISTENCY,
					metadata: { targetTime: '04:00', marginMinutes: 30 },
					translations: [],
				},
			};

			prismaService.sleepEntry.findFirst.mockResolvedValue({
				...defaultSleepEntry,
				sleepStart: new Date('2026-10-15T04:15:00.000Z'),
			});
			prismaService.userChallenge.findMany.mockResolvedValue([
				bedtimeChallenge,
			]);

			await processor.process(defaultJob);

			expect(challengeActionService.completeChallengeTask).toHaveBeenCalled();
		});

		it('should fail WAKE_TIME_CONSISTENCY if outside margin', async () => {
			const wakeTimeChallenge = {
				...defaultUserChallenge,
				challenge: {
					type: ChallengeType.WAKE_TIME_CONSISTENCY,
					metadata: { targetTime: '07:00', marginMinutes: 30 },
					translations: [],
				},
			};

			prismaService.sleepEntry.findFirst.mockResolvedValue({
				...defaultSleepEntry,
				sleepEnd: new Date('2026-10-15T08:00:00.000Z'),
			});
			prismaService.userChallenge.findMany.mockResolvedValue([
				wakeTimeChallenge,
			]);

			await processor.process(defaultJob);

			expect(challengeActionService.failChallengeTask).toHaveBeenCalled();
		});
	});
});
