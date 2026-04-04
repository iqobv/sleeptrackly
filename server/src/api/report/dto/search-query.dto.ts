import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';
import { Prisma, ReportStatus, ReportType } from 'generated/prisma/client';

export const SORT_BY = ['createdAt', 'updatedAt'] as const;
export type SortBy = (typeof SORT_BY)[number];

export class SearchQueryDto {
	@ApiProperty({ example: 1 })
	@Type(() => Number)
	@IsNumber({ allowNaN: false, allowInfinity: false })
	@Min(1)
	page: number = 1;

	@ApiProperty({ example: 10 })
	@Type(() => Number)
	@IsNumber({ allowNaN: false, allowInfinity: false })
	@Min(1)
	pageSize: number = 10;

	@ApiProperty({
		example: Prisma.SortOrder.asc,
		required: false,
		enum: Prisma.SortOrder,
	})
	@IsEnum(Prisma.SortOrder, { message: 'Sort order is invalid' })
	@IsOptional()
	sortOrder?: Prisma.SortOrder;

	@ApiProperty({
		example: 'createdAt',
		required: false,
		enum: SORT_BY,
	})
	@IsEnum(SORT_BY, { message: 'Sort by is invalid' })
	@IsOptional()
	sortBy?: SortBy;

	@ApiProperty({
		example: ReportStatus.PENDING,
		enum: ReportStatus,
		required: false,
	})
	@IsEnum(ReportStatus, { message: 'Status is invalid' })
	@IsOptional()
	status?: ReportStatus;

	@ApiProperty({
		example: ReportType.USER,
		enum: ReportType,
		required: false,
	})
	@IsEnum(ReportType, { message: 'Report type is invalid' })
	@IsOptional()
	reportType?: ReportType;
}
