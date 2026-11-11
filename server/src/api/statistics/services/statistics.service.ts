import { PrismaService } from '@infra/prisma/prisma.service';
import { DATE_FORMAT } from '@libs/constants/date-format.constants';
import { sleepEntryWhere } from '@libs/prisma/daily-statistics-sleep-entries.where.prisma';
import { dailyStatisticsAggregate } from '@libs/prisma/daily-statistics.aggregate.prisma';
import { appDayjs } from '@libs/utils/dayjs.util';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { StatisticsQueryDto } from '../dto/statistics-query.dto';
import { StatisticsDto, StatisticsMetricsDto } from '../dto/statistics.dto';

@Injectable()
export class StatisticsService {
	constructor(private readonly prismaService: PrismaService) {}

	public async getStatistics(
		query: StatisticsQueryDto,
	): Promise<StatisticsDto> {
		const { date, platform } = query;

		const targetDate = appDayjs(date);
		const currentWeekStart = targetDate.startOf('isoWeek').format(DATE_FORMAT);
		const currentWeekEnd = targetDate.endOf('isoWeek').format(DATE_FORMAT);

		const previousWeekStart = targetDate
			.subtract(1, 'week')
			.startOf('isoWeek')
			.format(DATE_FORMAT);
		const previousWeekEnd = targetDate
			.subtract(1, 'week')
			.endOf('isoWeek')
			.format(DATE_FORMAT);

		const [
			currentStats,
			previousStats,
			currentActiveUsers,
			previousActiveUsers,
			totalRegisteredUsersCount,
		] = await Promise.all([
			this.prismaService.dailyStatistics.aggregate(
				dailyStatisticsAggregate(currentWeekStart, currentWeekEnd, platform),
			),
			this.prismaService.dailyStatistics.aggregate(
				dailyStatisticsAggregate(previousWeekStart, previousWeekEnd, platform),
			),
			this.prismaService.sleepEntry
				.groupBy({
					by: ['userId'],
					where: sleepEntryWhere(currentWeekStart, currentWeekEnd),
				})
				.then((result) => result.length),
			this.prismaService.sleepEntry
				.groupBy({
					by: ['userId'],
					where: sleepEntryWhere(previousWeekStart, previousWeekEnd),
				})
				.then((result) => result.length),
			this.prismaService.user.count({
				where: { deletedAt: null, emailVerified: true },
			}),
		]);

		const getSum = (stats: any, field: string) => stats?._sum?.[field] || 0;

		const getMetric = (
			current: number,
			previous: number,
		): StatisticsMetricsDto => ({
			current,
			previous,
			percentageChange: this.calculatePercentageChange(current, previous),
		});

		const hasPreviousWeekData =
			Object.values(previousStats._sum || {}).some((v) => v !== null) ||
			previousActiveUsers > 0;

		const result: StatisticsDto = {
			totalRegisteredUsersCount,
			hasPreviousWeekData,
			registered: getMetric(
				getSum(currentStats, 'registeredCount'),
				getSum(previousStats, 'registeredCount'),
			),
			activeUsers: getMetric(currentActiveUsers, previousActiveUsers),
			achievements: getMetric(
				getSum(currentStats, 'achievementsCount'),
				getSum(previousStats, 'achievementsCount'),
			),
			challengesStarted: getMetric(
				getSum(currentStats, 'challengesStartedCount'),
				getSum(previousStats, 'challengesStartedCount'),
			),
			challengesCompleted: getMetric(
				getSum(currentStats, 'challengesCompletedCount'),
				getSum(previousStats, 'challengesCompletedCount'),
			),
			challengesFailed: getMetric(
				getSum(currentStats, 'challengesFailedCount'),
				getSum(previousStats, 'challengesFailedCount'),
			),
			purchases: getMetric(
				getSum(currentStats, 'purchasesCount'),
				getSum(previousStats, 'purchasesCount'),
			),
		};

		return plainToInstance(StatisticsDto, result);
	}

	private calculatePercentageChange(current: number, previous: number): number {
		if (previous === 0) return current > 0 ? 100 : 0;

		return Number((((current - previous) / previous) * 100).toFixed(2));
	}
}
