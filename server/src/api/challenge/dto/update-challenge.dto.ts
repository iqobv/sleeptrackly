import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateChallengeDto } from './create-challenge.dto';

export class UpdateChallengeDto extends OmitType(
	PartialType(CreateChallengeDto),
	['tasksOptions', 'startDate', 'endDate', 'frequency'],
) {
	@ApiProperty({ example: true })
	@IsBoolean()
	@IsOptional()
	isStarted?: boolean;

	@ApiProperty({ example: true })
	@IsBoolean()
	@IsOptional()
	isCompleted?: boolean;
}
