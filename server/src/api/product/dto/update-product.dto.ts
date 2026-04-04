import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { ProfileItemType } from 'generated/prisma/enums';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends OmitType(PartialType(CreateProductDto), [
	'bundleId',
	'itemId',
] as const) {
	@ApiProperty({ example: true, required: false })
	@IsBoolean()
	@IsOptional()
	isPopular?: boolean;

	@ApiProperty({
		example: ProfileItemType.BACKGROUND_IMAGE,
		required: false,
		enum: ProfileItemType,
	})
	@IsEnum(ProfileItemType)
	@IsOptional()
	itemType?: ProfileItemType;
}
