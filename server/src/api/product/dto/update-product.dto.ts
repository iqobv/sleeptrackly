import { ProfileItemType } from '@generated/prisma/enums';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends OmitType(PartialType(CreateProductDto), [
	'bundleId',
	'itemId',
] as const) {
	@IsBoolean()
	@IsOptional()
	isPopular?: boolean;

	@ApiProperty({ enum: ProfileItemType, enumName: 'ProfileItemType' })
	@IsEnum(ProfileItemType)
	@IsOptional()
	itemType?: ProfileItemType;
}
