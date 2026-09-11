import { IsChartDate } from '@libs/validators/is-chart-date.validator';
import { IsBoolean, IsOptional, IsUUID } from 'class-validator';

export class WeeklySummaryPayloadDto {
	@IsUUID('4') userId: string;
	@IsChartDate() dateForChart: string;

	@IsOptional()
	@IsBoolean()
	isManual?: boolean;
}
