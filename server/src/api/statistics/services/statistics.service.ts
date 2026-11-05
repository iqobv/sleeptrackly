import { PrismaService } from '@infra/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import utc from 'dayjs/plugin/utc';
import { StatisticsQueryDto } from '../dto/statistics-query.dto';
import { StatisticsDto, StatisticsMetricsDto } from '../dto/statistics.dto';

dayjs.extend(isoWeek);
dayjs.extend(utc);

@Injectable()
export class StatisticsService {
	constructor(private readonly prismaService: PrismaService) {}

	public async getStatistics(
		query: StatisticsQueryDto,
	): Promise<StatisticsDto> {
		const { date } = query;

		const targetDate = dayjs(date);
		const previousDate = targetDate.subtract(1, 'week');

		const [currentStats, previousStats, totalRegisteredUsersCount] =
			await Promise.all([
				this.prismaService.weeklyStatistics.findUnique({
					where: {
						year_isoWeek: {
							year: targetDate.year(),
							isoWeek: targetDate.isoWeek(),
						},
					},
				}),
				this.prismaService.weeklyStatistics.findUnique({
					where: {
						year_isoWeek: {
							year: previousDate.year(),
							isoWeek: previousDate.isoWeek(),
						},
					},
				}),
				this.prismaService.user.count({ where: { emailVerified: true } }),
			]);

		const getMetric = (
			field: keyof NonNullable<typeof currentStats>,
		): StatisticsMetricsDto => {
			const current = (currentStats?.[field] as number) || 0;
			const previous = (previousStats?.[field] as number) || 0;

			return {
				current,
				previous,
				percentageChange: this.calculatePercentageChange(current, previous),
			};
		};

		const result: StatisticsDto = {
			totalRegisteredUsersCount,
			hasPreviousWeekData: !!previousStats,
			registered: getMetric('registeredCount'),
			activeUsers: getMetric('activeUsersCount'),
			achievements: getMetric('achievementsCount'),
			challengesStarted: getMetric('challengesStartedCount'),
			challengesCompleted: getMetric('challengesCompletedCount'),
			challengesFailed: getMetric('challengesFailedCount'),
			purchases: getMetric('purchasesCount'),
		};

		return plainToInstance(StatisticsDto, result);
	}

	private calculatePercentageChange(current: number, previous: number): number {
		if (previous === 0) return current > 0 ? 100 : 0;

		return Number((((current - previous) / previous) * 100).toFixed(2));
	}
}
