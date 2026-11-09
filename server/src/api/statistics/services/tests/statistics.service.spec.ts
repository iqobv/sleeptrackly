import { PrismaService } from '@infra/prisma/prisma.service';
import { DATE_FORMAT } from '@libs/constants/date-format.constants';
import { prismaMock } from '@libs/prisma/prisma.mock';
import { appDayjs } from '@libs/utils/dayjs.util';
import { partialMock } from '@libs/utils/mock-helper.util';
import { Test, TestingModule } from '@nestjs/testing';
import { mockReset } from 'jest-mock-extended';
import { StatisticsDto, StatisticsMetricsDto } from '../../dto/statistics.dto';
import { StatisticsService } from '../statistics.service';

describe('StatisticsService', () => {
	let service: StatisticsService;

	const defaultMetric: StatisticsMetricsDto = {
		current: 0,
		previous: 0,
		percentageChange: 0,
	};

	const defaultStatistics: StatisticsDto = {
		totalRegisteredUsersCount: 0,
		hasPreviousWeekData: false,
		registered: defaultMetric,
		activeUsers: defaultMetric,
		achievements: defaultMetric,
		challengesStarted: defaultMetric,
		challengesCompleted: defaultMetric,
		challengesFailed: defaultMetric,
		purchases: defaultMetric,
	};

	const testDate = appDayjs('2026-11-01');
	const dateString = testDate.format(DATE_FORMAT);

	const currentWeekStart = testDate.startOf('isoWeek').format(DATE_FORMAT);
	const currentWeekEnd = testDate.endOf('isoWeek').format(DATE_FORMAT);
	const previousWeekStart = testDate
		.subtract(1, 'week')
		.startOf('isoWeek')
		.format(DATE_FORMAT);
	const previousWeekEnd = testDate
		.subtract(1, 'week')
		.endOf('isoWeek')
		.format(DATE_FORMAT);

	type AggregateMockReturn = Awaited<
		ReturnType<typeof prismaMock.dailyStatistics.aggregate>
	>;

	type GroupByMockElement = Awaited<
		ReturnType<typeof prismaMock.sleepEntry.groupBy>
	>[number];

	const emptyAggregate = partialMock<AggregateMockReturn>({
		_sum: {
			registeredCount: null,
			achievementsCount: null,
			challengesStartedCount: null,
			challengesCompletedCount: null,
			challengesFailedCount: null,
			purchasesCount: null,
		},
	});

	const generateActiveUsersMock = (count: number): GroupByMockElement[] => {
		return Array.from({ length: count }, (_, index) =>
			partialMock<GroupByMockElement>({
				userId: `user-id-${index}`,
			}),
		);
	};

	beforeEach(async () => {
		mockReset(prismaMock);

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				StatisticsService,
				{ provide: PrismaService, useValue: prismaMock },
			],
		}).compile();

		service = module.get<StatisticsService>(StatisticsService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('getStatistics', () => {
		it('should return default statistics when no data is available', async () => {
			jest
				.spyOn(prismaMock.dailyStatistics, 'aggregate')
				.mockResolvedValueOnce(emptyAggregate)
				.mockResolvedValueOnce(emptyAggregate);

			jest
				.spyOn(prismaMock.sleepEntry, 'groupBy')
				.mockResolvedValueOnce([])
				.mockResolvedValueOnce([]);

			jest.spyOn(prismaMock.user, 'count').mockResolvedValue(0);

			const result = await service.getStatistics({ date: dateString });

			expect(result).toMatchObject(defaultStatistics);

			expect(prismaMock.dailyStatistics.aggregate).toHaveBeenNthCalledWith(
				1,
				expect.objectContaining({
					where: { date: { gte: currentWeekStart, lte: currentWeekEnd } },
				}),
			);
			expect(prismaMock.dailyStatistics.aggregate).toHaveBeenNthCalledWith(
				2,
				expect.objectContaining({
					where: { date: { gte: previousWeekStart, lte: previousWeekEnd } },
				}),
			);
			expect(prismaMock.user.count).toHaveBeenCalledWith({
				where: { deletedAt: null, emailVerified: true },
			});
		});

		it('should return correct statistics when data is available', async () => {
			const currentAggregate = partialMock<AggregateMockReturn>({
				_sum: {
					registeredCount: 150,
					achievementsCount: 200,
					challengesStartedCount: 15,
					challengesCompletedCount: 0,
					challengesFailedCount: 5,
					purchasesCount: 110,
				},
			});

			const previousAggregate = partialMock<AggregateMockReturn>({
				_sum: {
					registeredCount: 100,
					achievementsCount: 100,
					challengesStartedCount: 20,
					challengesCompletedCount: 10,
					challengesFailedCount: 0,
					purchasesCount: 100,
				},
			});

			jest
				.spyOn(prismaMock.dailyStatistics, 'aggregate')
				.mockResolvedValueOnce(currentAggregate)
				.mockResolvedValueOnce(previousAggregate);

			jest
				.spyOn(prismaMock.sleepEntry, 'groupBy')
				.mockResolvedValueOnce(generateActiveUsersMock(40))
				.mockResolvedValueOnce(generateActiveUsersMock(50));

			jest.spyOn(prismaMock.user, 'count').mockResolvedValue(1000);

			const result = await service.getStatistics({ date: dateString });

			expect(result).toMatchObject({
				totalRegisteredUsersCount: 1000,
				hasPreviousWeekData: true,
				registered: { current: 150, previous: 100, percentageChange: 50 },
				activeUsers: { current: 40, previous: 50, percentageChange: -20 },
				achievements: { current: 200, previous: 100, percentageChange: 100 },
				challengesStarted: { current: 15, previous: 20, percentageChange: -25 },
				challengesCompleted: {
					current: 0,
					previous: 10,
					percentageChange: -100,
				},
				challengesFailed: { current: 5, previous: 0, percentageChange: 100 },
				purchases: { current: 110, previous: 100, percentageChange: 10 },
			});
		});

		it('should handle correctly when only current week data is available', async () => {
			const currentAggregate = partialMock<AggregateMockReturn>({
				_sum: {
					registeredCount: 100,
					achievementsCount: 0,
					challengesStartedCount: 0,
					challengesCompletedCount: null,
					challengesFailedCount: null,
					purchasesCount: null,
				},
			});

			jest
				.spyOn(prismaMock.dailyStatistics, 'aggregate')
				.mockResolvedValueOnce(currentAggregate)
				.mockResolvedValueOnce(emptyAggregate);

			jest
				.spyOn(prismaMock.sleepEntry, 'groupBy')
				.mockResolvedValueOnce(generateActiveUsersMock(50))
				.mockResolvedValueOnce([]);

			jest.spyOn(prismaMock.user, 'count').mockResolvedValue(500);

			const result = await service.getStatistics({ date: dateString });

			expect(result).toMatchObject({
				hasPreviousWeekData: false,
				registered: { current: 100, previous: 0, percentageChange: 100 },
				activeUsers: { current: 50, previous: 0, percentageChange: 100 },
				achievements: { current: 0, previous: 0, percentageChange: 0 },
				challengesStarted: { current: 0, previous: 0, percentageChange: 0 },
				totalRegisteredUsersCount: 500,
			});
		});

		it('should handle correctly when only previous week data is available', async () => {
			const previousAggregate = partialMock<AggregateMockReturn>({
				_sum: {
					registeredCount: 100,
					achievementsCount: 0,
					challengesStartedCount: 0,
					challengesCompletedCount: null,
					challengesFailedCount: null,
					purchasesCount: null,
				},
			});

			jest
				.spyOn(prismaMock.dailyStatistics, 'aggregate')
				.mockResolvedValueOnce(emptyAggregate)
				.mockResolvedValueOnce(previousAggregate);

			jest
				.spyOn(prismaMock.sleepEntry, 'groupBy')
				.mockResolvedValueOnce([])
				.mockResolvedValueOnce(generateActiveUsersMock(50));

			jest.spyOn(prismaMock.user, 'count').mockResolvedValue(300);

			const result = await service.getStatistics({ date: dateString });

			expect(result).toMatchObject({
				hasPreviousWeekData: true,
				registered: { current: 0, previous: 100, percentageChange: -100 },
				activeUsers: { current: 0, previous: 50, percentageChange: -100 },
				achievements: { current: 0, previous: 0, percentageChange: 0 },
				challengesStarted: { current: 0, previous: 0, percentageChange: 0 },
				totalRegisteredUsersCount: 300,
			});
		});
	});
});
