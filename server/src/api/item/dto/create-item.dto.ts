import { ItemRarity, ProfileItemType } from '@generated/prisma/enums';
import { TransformBoolean, TransformTranslations } from '@libs/decorators';
import { TranslationDto } from '@libs/dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
	IsArray,
	IsBoolean,
	IsEnum,
	IsNumber,
	IsOptional,
	Min,
	ValidateNested,
} from 'class-validator';

export class CreateItemDto {
	@ApiProperty({ example: false, required: false })
	@IsOptional()
	@TransformBoolean()
	@IsBoolean()
	isExclusive?: boolean;

	@ApiProperty({ example: ProfileItemType.AVATAR_FRAME })
	@IsEnum(ProfileItemType)
	type: ProfileItemType;

	@ApiProperty({ example: 1200 })
	@Type(() => Number)
	@IsNumber()
	@Min(0)
	basePrice: number;

	@ApiProperty({ example: ItemRarity.COMMON, enum: ItemRarity })
	@IsEnum(ItemRarity)
	rarity: ItemRarity;

	@ApiProperty({ type: [TranslationDto] })
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => TranslationDto)
	@TransformTranslations(TranslationDto)
	translations: TranslationDto[];
}

export class CreateItemSwaggerDto extends CreateItemDto {
	@ApiProperty({ type: 'string', format: 'binary' })
	media: Express.Multer.File;

	@ApiProperty({ type: 'string', format: 'binary' })
	preview: Express.Multer.File;
}
