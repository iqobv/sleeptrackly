import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class UpdateChallengeTaskDto {
	@IsBoolean()
	@IsOptional()
	isCompleted?: boolean;

	@IsNumber()
	@IsOptional()
	completedValue?: number;
}
