import { Platform } from '@generated/prisma/enums';
import { PrismaService } from '@infra/prisma/prisma.service';
import { DATE_FORMAT } from '@libs/constants/date-format.constants';
import { prismaMock } from '@libs/prisma/prisma.mock';
import { appDayjs } from '@libs/utils/dayjs.util';
import { Test, TestingModule } from '@nestjs/testing';
import { Job } from 'bullmq';
import { mockReset } from 'jest-mock-extended';
import { StatisticsQueuePayloadDto } from '../dto/statistics-queue-payload.dto';
import { StatisticsType } from '../types/statistics-type.types';
import { StatisticsProcessor } from './statistics.processor';

type DefaultJob = Job<StatisticsQueuePayloadDto>;

describe('StatisticsProcessor', () => {
	let processor: StatisticsProcessor;

	const FIXED_DATE = new Date('2026-11-05T12:00:00Z');
	const now = appDayjs(FIXED_DATE).format(DATE_FORMAT);
	const platform = Platform.WEB;

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
				const job = {
					data: {
						type,
						data: { platform },
					},
				} as DefaultJob;

				await processor.process(job);

				expect(prismaMock.dailyStatistics.upsert).toHaveBeenCalledWith({
					where: {
						date_platform: { date: now, platform },
					},
					update: {
						[field]: { increment: 1 },
					},
					create: {
						date: now,
						platform,
						[field]: 1,
					},
				});
			},
		);
	});

	describe('unhandled statistics type', () => {
		it('should log a warning for unhandled statistics type', async () => {
			const job = {
				data: {
					type: 'UNKNOWN_TYPE' as StatisticsType,
					data: { platform },
				},
			} as DefaultJob;

			await processor.process(job);

			expect(prismaMock.dailyStatistics.upsert).not.toHaveBeenCalled();
			expect(prismaMock.sleepEntry.groupBy).not.toHaveBeenCalled();
		});
	});
});
