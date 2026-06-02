import { Expose, Type } from 'class-transformer';
import { SleepDayDto } from './sleep-day.dto';
import { SleepStatisticsDto } from './statistics.dto';

export class SleepDashboardDto {
	@Expose()
	@Type(() => SleepStatisticsDto)
	statistics: SleepStatisticsDto;

	@Expose()
	@Type(() => SleepDayDto)
	days: SleepDayDto[];

	@Expose() hasMore: boolean;
}
