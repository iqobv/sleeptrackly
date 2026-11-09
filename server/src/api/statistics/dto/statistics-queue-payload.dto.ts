import { Platform } from '@generated/prisma/enums';
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

	@IsUUID('4')
	entityId: string;

	@IsEnum(Platform)
	@IsOptional()
	platform?: Platform;
}

export class StatisticsQueuePayloadDto {
	@IsEnum(StatisticsType)
	type: StatisticsType;

	@ValidateNested()
	@Type(() => StatisticsQueueDataDto)
	@IsObject()
	data: StatisticsQueueDataDto;
}
