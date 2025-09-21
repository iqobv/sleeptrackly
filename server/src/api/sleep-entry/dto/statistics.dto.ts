import { ApiProperty } from '@nestjs/swagger';

export class SleepStatisticsDto {
	@ApiProperty({ example: 1 })
	weekNumber: number;

	@ApiProperty({ example: 10000 })
	totalSleepDuration: number;

	@ApiProperty({ example: 10000 })
	averageSleepDurationByData: number;

	@ApiProperty({ example: 10000 })
	averageSleepDurationForWeek: number;
}
