import { IsChartDate } from '@libs/validators/is-chart-date.validator';
import { Type } from 'class-transformer';
import {
	IsDate,
	IsNumber,
	IsString,
	IsTimeZone,
	Max,
	Min,
} from 'class-validator';

export class CreateSleepEntryDto {
	@Type(() => Date)
	@IsDate()
	sleepStart: Date;

	@Type(() => Date)
	@IsDate()
	sleepEnd: Date;

	@IsString()
	@IsChartDate()
	dateForChart: string;

	@IsNumber()
	@Min(1)
	@Max(5)
	rating: number;

	@IsString()
	@IsTimeZone()
	timezone: string;
}
