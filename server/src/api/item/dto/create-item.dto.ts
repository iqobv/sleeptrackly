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
	@IsOptional()
	@TransformBoolean()
	@IsBoolean()
	isExclusive?: boolean;

	/** @example AVATAR_FRAME */
	@ApiProperty({ enum: ProfileItemType, enumName: 'ProfileItemType' })
	@IsEnum(ProfileItemType)
	type: ProfileItemType;

	@Type(() => Number)
	@IsNumber()
	@Min(0)
	basePrice: number;

	/** @example COMMON */
	@IsEnum(ItemRarity)
	rarity: ItemRarity;

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
