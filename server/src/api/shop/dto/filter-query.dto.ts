import { Prisma } from '@generated/prisma/client';
import { ProductType, ProfileItemType } from '@generated/prisma/enums';
import { TransformEnum, TransformToArray } from '@libs/decorators';
import { PaginationQueryWithLanguageDto } from '@libs/dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { SHOP_SORT_BY } from '../constats';
import type { SortByType } from '../types';

export class FilterQueryDto extends PaginationQueryWithLanguageDto {
	@ApiProperty({
		required: false,
		description: 'Filter by product type',
		example: 'ALL',
	})
	@IsOptional()
	@TransformEnum<'ALL' | ProductType>()
	@IsEnum(['ALL', ...Object.values(ProductType)] as const)
	type?: 'ALL' | ProductType;

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
		example: SHOP_SORT_BY.DATE,
		enum: SHOP_SORT_BY,
	})
	@IsOptional()
	@TransformEnum<SortByType>()
	@IsEnum(SHOP_SORT_BY)
	sortBy?: SortByType;

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
}
