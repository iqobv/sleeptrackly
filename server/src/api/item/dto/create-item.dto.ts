import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
	IsArray,
	IsBoolean,
	IsEnum,
	IsNumber,
	IsOptional,
	Min,
	ValidateNested,
} from 'class-validator';
import { ItemRarity, ProfileItemType } from 'generated/prisma/enums';
import { TranslationDto } from 'src/libs/dto';

export class CreateItemDto {
	@ApiProperty({ example: false, required: false })
	@Type(() => Boolean)
	@IsOptional()
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
	@Transform(({ value }) => {
		if (Array.isArray(value)) {
			return value.map((item) => {
				if (typeof item === 'string') {
					try {
						return JSON.parse(item) as TranslationDto;
					} catch {
						return item as unknown as TranslationDto;
					}
				}
				return item as TranslationDto;
			});
		}

		if (typeof value === 'string') {
			try {
				const parsed = JSON.parse(value) as unknown;
				return (Array.isArray(parsed) ? parsed : [parsed]) as TranslationDto[];
			} catch {
				return [] as TranslationDto[];
			}
		}

		return [] as TranslationDto[];
	})
	translations: TranslationDto[];
}

export class CreateItemSwaggerDto extends CreateItemDto {
	@ApiProperty({ type: 'string', format: 'binary' })
	media: Express.Multer.File;

	@ApiProperty({ type: 'string', format: 'binary' })
	preview: Express.Multer.File;
}
