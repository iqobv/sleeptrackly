import { ApiProperty } from '@nestjs/swagger';
import { SleepDayDto } from './sleep-day.dto';
import { SleepStatisticsDto } from './statistics.dto';

export class SleepDashboardDto {
	@ApiProperty({ type: SleepStatisticsDto })
	statistics: SleepStatisticsDto;

	@ApiProperty({ type: SleepDayDto, isArray: true })
	days: SleepDayDto[];

	@ApiProperty({ example: true })
	hasMore: boolean;
}
