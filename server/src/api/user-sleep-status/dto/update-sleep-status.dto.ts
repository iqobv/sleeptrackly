import { IsBefore } from '@libs/validators/is-before.validator';
import { Type } from 'class-transformer';
import {
	IsDate,
	IsNumber,
	IsOptional,
	IsString,
	Max,
	Min,
} from 'class-validator';

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

	@IsOptional()
	@Type(() => Date)
	@IsDate()
	@IsBefore('sleepEnd')
	sleepStart?: Date;

	@IsOptional()
	@Type(() => Date)
	@IsDate()
	sleepEnd?: Date;
}
