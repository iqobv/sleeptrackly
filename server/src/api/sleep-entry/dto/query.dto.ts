import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class QueryDto {
	@Type(() => Number)
	@IsNumber()
	@Min(0)
	@IsOptional()
	week?: number;
}
