import { Expose, Type } from 'class-transformer';

export class StatisticsMetricsDto {
	@Expose() current: number;
	@Expose() previous: number;
	@Expose() percentageChange: number;
}

export class StatisticsDto {
	@Expose() totalRegisteredUsersCount: number;
	@Expose() hasNextWeekData: boolean;

	@Expose()
	@Type(() => StatisticsMetricsDto)
	registered: StatisticsMetricsDto;

	@Expose()
	@Type(() => StatisticsMetricsDto)
	activeUsers: StatisticsMetricsDto;

	@Expose()
	@Type(() => StatisticsMetricsDto)
	achievements: StatisticsMetricsDto;

	@Expose()
	@Type(() => StatisticsMetricsDto)
	challengesStarted: StatisticsMetricsDto;

	@Expose()
	@Type(() => StatisticsMetricsDto)
	challengesCompleted: StatisticsMetricsDto;

	@Expose()
	@Type(() => StatisticsMetricsDto)
	challengesFailed: StatisticsMetricsDto;

	@Expose()
	@Type(() => StatisticsMetricsDto)
	purchases: StatisticsMetricsDto;
}
