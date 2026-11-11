import { Platform } from '@generated/prisma/enums';
import { IsChartDate } from '@libs/validators/is-chart-date.validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class StatisticsQueryDto {
	@IsChartDate()
	@IsString()
	@IsOptional()
	date?: string;

	@IsOptional()
	@IsEnum(Platform)
	@ApiProperty({ enumName: 'Platform', enum: Platform, required: false })
	platform?: Platform;
}
