import { IsChartDate } from '@libs/validators/is-chart-date.validator';
import { IsString } from 'class-validator';

export class QueryDto {
	@IsChartDate()
	@IsString()
	date: string;
}
