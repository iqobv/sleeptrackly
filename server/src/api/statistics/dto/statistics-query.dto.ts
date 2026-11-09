import { IsChartDate } from '@libs/validators/is-chart-date.validator';
import { IsOptional, IsString } from 'class-validator';

export class StatisticsQueryDto {
	@IsChartDate()
	@IsString()
	@IsOptional()
	date?: string;
}
