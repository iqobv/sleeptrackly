import { OmitType, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateChallengeDto } from './create-challenge.dto';

export class UpdateChallengeDto extends OmitType(
	PartialType(CreateChallengeDto),
	['tasksOptions', 'startDate', 'endDate', 'frequency'],
) {
	@IsBoolean()
	@IsOptional()
	isStarted?: boolean;

	@IsBoolean()
	@IsOptional()
	isCompleted?: boolean;
}
