import { DefaultFieldsDto } from '@libs/dto';
import { ApiProperty, OmitType } from '@nestjs/swagger';

export class WeeklySummaryDto extends OmitType(DefaultFieldsDto, [
	'updatedAt',
] as const) {
	@ApiProperty({ example: '00478b8d-b42d-4570-82c8-6f0828e7ec21' })
	userId: string;

	@ApiProperty({ example: 2026 })
	year: number;

	@ApiProperty({ example: 10 })
	weekNumber: number;

	@ApiProperty({ example: new Date() })
	weekStartDate: Date;

	@ApiProperty({ example: new Date() })
	weekEndDate: Date;

	@ApiProperty({ example: 210231 })
	totalSleepDuration: number;

	@ApiProperty({ example: 30000 })
	avgSleepDuration: number;

	@ApiProperty({ example: 24539 })
	minSleepDuration: number;

	@ApiProperty({ example: new Date() })
	minSleepDate: Date | null;

	@ApiProperty({ example: 37354 })
	maxSleepDuration: number;

	@ApiProperty({ example: new Date() })
	maxSleepDate: Date | null;

	@ApiProperty({ example: 15 })
	avgBedtimeOffset: number;

	@ApiProperty({ example: 10 })
	avgWakeTimeOffset: number;

	@ApiProperty({ example: 7 })
	daysTracked: number;

	@ApiProperty({ example: 85 })
	sleepScoreAvg: number;

	@ApiProperty({ example: 90 })
	coinsEarned: number;

	@ApiProperty({ example: 5 })
	achievementsUnlocked: number;
}
