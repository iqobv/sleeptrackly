import { IsOptional, IsString } from 'class-validator';

export class UpdateUserSleepStatusDto {
	/** @example '2026-05-22' */
	@IsString()
	@IsOptional()
	dateForChart?: string;
}
