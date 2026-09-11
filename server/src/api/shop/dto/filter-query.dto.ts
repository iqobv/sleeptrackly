import { Prisma } from '@generated/prisma/client';
import { ProfileItemType } from '@generated/prisma/enums';
import { TransformEnum } from '@libs/decorators/transform-enum.decorator';
import { TransformToArray } from '@libs/decorators/transform-to-array.decorator';
import { PaginationQueryWithLanguageDto } from '@libs/dto/pagination-language-query.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
	IsArray,
	IsEnum,
	IsNumber,
	IsOptional,
	IsString,
} from 'class-validator';
import { ShopProductType } from '../types/shop-product-type.types';
import { ShopSortBy } from '../types/sort-by.types';

export class FilterQueryDto extends PaginationQueryWithLanguageDto {
	@ApiProperty({
		required: false,
		description: 'Filter by product type',
		example: 'ALL',
		enum: ShopProductType,
		enumName: 'ShopProductType',
	})
	@IsOptional()
	@TransformEnum<ShopProductType>()
	@IsEnum(ShopProductType)
	type?: ShopProductType;

	@ApiProperty({
		required: false,
		description: 'Filter by profile item type',
		example: `${ProfileItemType.AVATAR_FRAME},${ProfileItemType.BACKGROUND_IMAGE}`,
		type: String,
	})
	@IsOptional()
	@TransformToArray<ProfileItemType>()
	@TransformEnum<ProfileItemType>()
	@IsEnum(ProfileItemType, { each: true })
	itemType?: ProfileItemType[];

	@ApiProperty({
		required: false,
		description: 'Filter by collection name',
		example: 'example-collection-1,example-collection-2',
	})
	@IsOptional()
	@TransformToArray<string>()
	@IsArray()
	@IsString({ each: true })
	collection?: string[];

	@ApiProperty({
		required: false,
		description: 'Search term to filter products by name or description',
		example: 'Cool Avatar Frame',
	})
	@IsString()
	@IsOptional()
	search?: string;

	@ApiProperty({
		required: false,
		description: 'Sort by field',
		example: ShopSortBy.DATE,
		enum: ShopSortBy,
		enumName: 'ShopSortBy',
	})
	@IsOptional()
	@TransformEnum<ShopSortBy>()
	@IsEnum(ShopSortBy)
	sortBy?: ShopSortBy;

	@ApiProperty({
		required: false,
		description: 'Sort order: asc or desc',
		example: 'desc',
		enum: Prisma.SortOrder,
	})
	@IsOptional()
	@TransformEnum<Prisma.SortOrder>('lower')
	@IsEnum(Prisma.SortOrder)
	sortOrder?: Prisma.SortOrder;

	@IsOptional()
	@Type(() => Number)
	@IsNumber()
	minPrice?: number;

	@IsOptional()
	@Type(() => Number)
	@IsNumber()
	maxPrice?: number;
}
