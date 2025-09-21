import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class UpdateChallengeTaskDto {
	@ApiProperty({ example: true })
	@IsBoolean()
	@IsOptional()
	isCompleted?: boolean;

	@ApiProperty({ example: 10, required: false })
	@IsNumber()
	@IsOptional()
	completedValue?: number;
}
