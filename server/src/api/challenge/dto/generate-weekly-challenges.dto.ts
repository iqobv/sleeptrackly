import { IsBoolean, IsOptional } from 'class-validator';

export class GenerateWeeklyChallengesDto {
	@IsOptional()
	@IsBoolean()
	currentWeek?: boolean;
}
