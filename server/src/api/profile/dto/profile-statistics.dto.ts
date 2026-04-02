import { ApiProperty } from '@nestjs/swagger';

export class ProfileStatistics {
	@ApiProperty({ example: 5 })
	countOfCompletedChallenges: number;

	@ApiProperty({ example: 10 })
	countOfSleepEntries: number;
}
