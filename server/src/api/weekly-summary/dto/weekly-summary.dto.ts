import { DefaultFieldsDto } from '@libs/dto/default-fields.dto';
import { OmitType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class WeeklySummaryDto extends OmitType(DefaultFieldsDto, [
	'updatedAt',
] as const) {
	@Expose() userId: string;
	@Expose() year: number;
	@Expose() weekNumber: number;
	@Expose() weekStartDate: Date;
	@Expose() weekEndDate: Date;
	@Expose() totalSleepDuration: number;
	@Expose() avgSleepDuration: number;
	@Expose() minSleepDuration: number;
	@Expose() minSleepDate: Date | null;
	@Expose() maxSleepDuration: number;
	@Expose() maxSleepDate: Date | null;
	@Expose() avgBedtimeOffset: number;
	@Expose() avgWakeTimeOffset: number;
	@Expose() daysTracked: number;
	@Expose() sleepScoreAvg: number;
	@Expose() coinsEarned: number;
	@Expose() achievementsUnlocked: number;
}
