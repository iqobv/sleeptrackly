import { Prisma, ReportStatus, ReportType } from '@generated/prisma/client';
import { PaginationQueryDto } from '@libs/dto/pagination-query.dto';
import { IsEnum, IsOptional } from 'class-validator';

export const SORT_BY = ['createdAt', 'updatedAt'] as const;
export type SortBy = (typeof SORT_BY)[number];

export class SearchQueryDto extends PaginationQueryDto {
	@IsEnum(Prisma.SortOrder, { message: 'Sort order is invalid' })
	@IsOptional()
	sortOrder?: Prisma.SortOrder;

	@IsEnum(SORT_BY, { message: 'Sort by is invalid' })
	@IsOptional()
	sortBy?: SortBy;

	@IsEnum(ReportStatus, { message: 'Status is invalid' })
	@IsOptional()
	status?: ReportStatus;

	@IsEnum(ReportType, { message: 'Report type is invalid' })
	@IsOptional()
	reportType?: ReportType;
}
