import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateChallengeTaskDto {
	@IsString()
	description: string;

	@IsNumber()
	targetValue: number;

	@IsDateString()
	startDate: Date;

	@IsDateString()
	endDate: Date;
}
