import { IsChartDate } from '@libs/validators/is-chart-date.validator';
import { Type } from 'class-transformer';
import {
	IsEnum,
	IsObject,
	IsOptional,
	IsUUID,
	ValidateNested,
} from 'class-validator';
import { StatisticsType } from '../types/statistics-type.types';

export class StatisticsQueueDataDto {
	@IsUUID('4')
	userId: string;

	@IsOptional()
	@IsChartDate()
	date?: string;
}

export class StatisticsQueuePayloadDto {
	@IsEnum(StatisticsType)
	type: StatisticsType;

	@ValidateNested()
	@Type(() => StatisticsQueueDataDto)
	@IsObject()
	data: StatisticsQueueDataDto;
}
