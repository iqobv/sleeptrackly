import { PrismaService } from '@infra/prisma/prisma.service';
import { prismaMock } from '@libs/prisma/prisma.mock';
import { Test, TestingModule } from '@nestjs/testing';
import { Job } from 'bullmq';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { mockReset } from 'jest-mock-extended';
import { StatisticsQueuePayloadDto } from '../dto/statistics-queue-payload.dto';
import { StatisticsType } from '../types/statistics-type.types';
import { StatisticsProcessor } from './statistics.processor';

dayjs.extend(isoWeek);

type DefaultJob = Job<StatisticsQueuePayloadDto>;

describe('StatisticsProcssor', () => {
	let processor: StatisticsProcessor;

	const FIXED_DATE = new Date('2026-11-05T12:00:00Z');
	const fixedDayjs = dayjs(FIXED_DATE);
	const currentYear = fixedDayjs.year();
	const currentWeek = fixedDayjs.isoWeek();

	const userId = 'user-1';
	const entryDate = '2026-11-05';

	beforeAll(() => {
		jest.useFakeTimers().setSystemTime(FIXED_DATE);
	});

	afterAll(() => {
		jest.useRealTimers();
	});

	beforeEach(async () => {
		mockReset(prismaMock);

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				StatisticsProcessor,
				{ provide: PrismaService, useValue: prismaMock },
			],
		}).compile();

		processor = module.get<StatisticsProcessor>(StatisticsProcessor);
	});

	it('should be defined', () => {
		expect(processor).toBeDefined();
	});

	describe('process', () => {
		const cases = [
			{ type: StatisticsType.USER_REGISTERED, field: 'registeredCount' },
			{ type: StatisticsType.ACHIEVEMENT_UNLOCKED, field: 'achievementsCount' },
			{
				type: StatisticsType.CHALLENGE_STARTED,
				field: 'challengesStartedCount',
			},
			{
				type: StatisticsType.CHALLENGE_COMPLETED,
				field: 'challengesCompletedCount',
			},
			{ type: StatisticsType.CHALLENGE_FAILED, field: 'challengesFailedCount' },
			{ type: StatisticsType.PURCHASE_MADE, field: 'purchasesCount' },
		];

		it.each(cases)(
			'should process $type and increment $field',
			async ({ type, field }) => {
				const job = { data: { type } } as DefaultJob;

				await processor.process(job);

				expect(prismaMock.weeklyStatistics.upsert).toHaveBeenCalledWith({
					where: {
						year_isoWeek: { year: currentYear, isoWeek: currentWeek },
					},
					update: {
						[field]: { increment: 1 },
					},
					create: {
						year: currentYear,
						isoWeek: currentWeek,
						[field]: 1,
					},
				});
			},
		);
	});

	describe('handleUserRegistered', () => {});

	describe('handleSleepEntryAdded', () => {
		it('should throw error if date is missing', async () => {
			const job = {
				data: { type: StatisticsType.SLEEP_ENTRY_ADDED, data: { userId } },
			} as DefaultJob;

			await expect(processor.process(job)).rejects.toThrow(
				`Date is required for ${StatisticsType.SLEEP_ENTRY_ADDED} statistics processing`,
			);
		});

		it('should increment active users if unique days reach threshold', async () => {
			const job = {
				data: {
					type: StatisticsType.SLEEP_ENTRY_ADDED,
					data: { userId, date: entryDate },
				},
			} as DefaultJob;

			(prismaMock.sleepEntry.groupBy as jest.Mock).mockResolvedValue([
				{ dateForChart: '2026-11-03' },
				{ dateForChart: '2026-11-04' },
				{ dateForChart: '2026-11-05' },
			]);

			await processor.process(job);

			expect(prismaMock.weeklyStatistics.upsert).toHaveBeenCalledWith({
				where: {
					year_isoWeek: { year: currentYear, isoWeek: currentWeek },
				},
				update: {
					activeUsersCount: { increment: 1 },
				},
				create: {
					year: currentYear,
					isoWeek: currentWeek,
					activeUsersCount: 1,
				},
			});
		});

		it('should not increment active users if unique days do not reach threshold', async () => {
			const job = {
				data: {
					type: StatisticsType.SLEEP_ENTRY_ADDED,
					data: { userId, date: entryDate },
				},
			} as DefaultJob;

			(prismaMock.sleepEntry.groupBy as jest.Mock).mockResolvedValue([
				{ dateForChart: '2026-11-04' },
				{ dateForChart: '2026-11-05' },
			]);

			await processor.process(job);

			expect(prismaMock.weeklyStatistics.upsert).not.toHaveBeenCalled();
		});
	});

	describe('unhandled statistics type', () => {
		it('should log a warning for unhandled statistics type', async () => {
			const job = { data: { type: 'UNKNOWN_TYPE' as StatisticsType } } as Job;

			await processor.process(job);

			expect(prismaMock.weeklyStatistics.upsert).not.toHaveBeenCalled();
			expect(prismaMock.sleepEntry.groupBy).not.toHaveBeenCalled();
		});
	});
});
