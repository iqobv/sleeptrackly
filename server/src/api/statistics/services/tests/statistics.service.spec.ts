import { WeeklyStatistics } from '@generated/prisma/client';
import { PrismaService } from '@infra/prisma/prisma.service';
import { DATE_FORMAT } from '@libs/constants/date-format.constants';
import { prismaMock } from '@libs/prisma/prisma.mock';
import { partialMock } from '@libs/utils/mock-helper.util';
import { Test, TestingModule } from '@nestjs/testing';
import dayjs from 'dayjs';
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

	const testDate = dayjs('2026-11-01');
	const dateString = testDate.format(DATE_FORMAT);

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
			prismaMock.weeklyStatistics.findUnique
				.mockResolvedValueOnce(null)
				.mockResolvedValueOnce(null);
			prismaMock.user.count.mockResolvedValue(0);

			const result = await service.getStatistics({ date: dateString });

			expect(result).toMatchObject(defaultStatistics);
			expect(prismaMock.weeklyStatistics.findUnique).toHaveBeenCalledWith({
				where: {
					year_isoWeek: {
						year: testDate.year(),
						isoWeek: testDate.isoWeek(),
					},
				},
			});
			expect(prismaMock.user.count).toHaveBeenCalledWith({
				where: { emailVerified: true },
			});
		});

		it('should return correct statistics when data is available', async () => {
			const currentStats = partialMock<WeeklyStatistics>({
				registeredCount: 150,
				activeUsersCount: 40,
				achievementsCount: 200,
				challengesStartedCount: 15,
				challengesCompletedCount: 0,
				challengesFailedCount: 5,
				purchasesCount: 110,
			});

			const previousStats = partialMock<WeeklyStatistics>({
				registeredCount: 100,
				activeUsersCount: 50,
				achievementsCount: 100,
				challengesStartedCount: 20,
				challengesCompletedCount: 10,
				challengesFailedCount: 0,
				purchasesCount: 100,
			});

			prismaMock.weeklyStatistics.findUnique
				.mockResolvedValueOnce(currentStats)
				.mockResolvedValueOnce(previousStats);

			prismaMock.user.count.mockResolvedValue(1000);

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
			const currentStats = partialMock<WeeklyStatistics>({
				registeredCount: 100,
				activeUsersCount: 50,
				achievementsCount: 0,
			});

			prismaMock.weeklyStatistics.findUnique
				.mockResolvedValueOnce(currentStats)
				.mockResolvedValueOnce(null);

			prismaMock.user.count.mockResolvedValue(500);

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
			const previousStats = partialMock<WeeklyStatistics>({
				registeredCount: 100,
				activeUsersCount: 50,
			});

			prismaMock.weeklyStatistics.findUnique
				.mockResolvedValueOnce(null)
				.mockResolvedValueOnce(previousStats);

			prismaMock.user.count.mockResolvedValue(300);

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
