import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserSleepStatusDto {
	@ApiProperty({ example: '2026-05-22', required: false })
	@IsString()
	@IsOptional()
	dateForChart?: string;
}
