import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

export class QueryDto {
	@ApiProperty({ required: true, example: '2026-05-18' })
	@Matches(/^\d{4}-\d{2}-\d{2}$/, {
		message: 'Date must be in YYYY-MM-DD format',
	})
	@IsString()
	date: string;
}
