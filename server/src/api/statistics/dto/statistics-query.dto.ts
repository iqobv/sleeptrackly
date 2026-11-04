import { IsString, Matches } from 'class-validator';

export class StatisticsQueryDto {
	/** @example '2026-11-04' */
	@Matches(/^\d{4}-\d{2}-\d{2}$/, {
		message: 'Date must be in YYYY-MM-DD format',
	})
	@IsString()
	date: string;
}
