import { ApiProperty } from '@nestjs/swagger';
import { ItemRarity, ProfileItemType } from '@prisma/client';
import {
	IsArray,
	IsBoolean,
	IsEnum,
	IsNumber,
	IsOptional,
	IsString,
	Min,
} from 'class-validator';
import { TranslationDto } from 'src/libs/dto';

export class CreateItemDto {
	@ApiProperty({ example: false, required: false })
	@IsBoolean()
	@IsOptional()
	isExclusive?: boolean;

	@ApiProperty({ example: ProfileItemType.AVATAR_FRAME })
	@IsEnum(ProfileItemType)
	type: ProfileItemType;

	@ApiProperty({ example: 1200 })
	@IsNumber()
	@Min(0)
	basePrice: number;

	@ApiProperty({ example: ItemRarity.COMMON, enum: ItemRarity })
	@IsEnum(ItemRarity)
	rarity: ItemRarity;

	@ApiProperty({ example: 'http://example.com/media/item.gif' })
	@IsString()
	mediaUrl: string;

	@ApiProperty({ type: [TranslationDto] })
	@IsArray()
	translations: TranslationDto[];
}
