import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class QueryDto {
	@ApiProperty({ required: true, example: 0 })
	@Type(() => Number)
	@IsNumber()
	@Min(0)
	@IsOptional()
	week?: number;
}
