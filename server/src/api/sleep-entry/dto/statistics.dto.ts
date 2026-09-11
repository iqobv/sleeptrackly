import { Expose } from 'class-transformer';

export class SleepStatisticsDto {
	@Expose() totalSleepDuration: number;
	@Expose() averageSleepDuration: number;
	@Expose() averageSleepRating: number;
}
