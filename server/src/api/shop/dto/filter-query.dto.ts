import { ApiProperty } from '@nestjs/swagger';
import { ProductType, ProfileItemType } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';
import { PaginationQueryWithLanguageDto } from 'src/libs/dto';

export class FilterQueryDto extends PaginationQueryWithLanguageDto {
	@ApiProperty({
		required: false,
		description: 'Filter by product type',
		example: 'ALL',
	})
	@IsOptional()
	@IsEnum(['ALL', ...Object.values(ProductType)] as const)
	type?: 'ALL' | ProductType;

	@ApiProperty({
		required: false,
		description: 'Filter by profile item type',
		example: ProfileItemType.AVATAR_FRAME,
	})
	@IsOptional()
	@IsEnum(ProfileItemType)
	itemType?: ProfileItemType;
}
