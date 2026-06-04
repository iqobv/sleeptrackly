import { Expose } from 'class-transformer';

export class ProfileStatisticsDto {
	@Expose() countOfCompletedChallenges: number;
	@Expose() countOfSleepEntries: number;
}
