import { IsBefore } from '@libs/validators/is-before.validator';
import { Type } from 'class-transformer';
import {
	IsBoolean,
	IsDate,
	IsNumber,
	IsOptional,
	IsString,
	Max,
	Min,
} from 'class-validator';

export class UpdateUserSleepStatusDto {
	/** @example '2026-05-2@Min(0)2' */
	@IsString()
	@IsOptional()
	dateForChart?: string;

	@IsOptional()
	@IsNumber()
	@Min(1)
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

	@IsOptional()
	@IsBoolean()
	isEdited?: boolean;
}
