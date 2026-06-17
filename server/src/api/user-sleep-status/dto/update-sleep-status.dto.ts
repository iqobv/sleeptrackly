import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateUserSleepStatusDto {
	/** @example '2026-05-22' */
	@IsString()
	@IsOptional()
	dateForChart?: string;

	@IsOptional()
	@IsNumber()
	@Min(0)
	@Max(5)
	rating?: number;
}
