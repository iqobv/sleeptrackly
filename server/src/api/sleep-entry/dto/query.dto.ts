import { IsString, Matches } from 'class-validator';

export class QueryDto {
	/** @example '2026-05-18' */
	@Matches(/^\d{4}-\d{2}-\d{2}$/, {
		message: 'Date must be in YYYY-MM-DD format',
	})
	@IsString()
	date: string;
}
