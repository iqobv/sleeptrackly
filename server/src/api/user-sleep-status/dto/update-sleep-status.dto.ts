import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class UpdateUserSleepStatusDto {
	@ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
	@IsDateString()
	clickedBy: Date;
}
