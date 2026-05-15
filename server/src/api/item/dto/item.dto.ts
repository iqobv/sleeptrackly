import { ItemRarity, ProfileItemType } from '@generated/prisma/enums';
import { TranslationDto } from '@libs/dto';
import { ApiProperty } from '@nestjs/swagger';

export class ItemDto {
	@ApiProperty({ example: 'b3f71cf8-b1eb-4c8f-909e-e4454cb95a4a' })
	id: string;

	@ApiProperty({
		type: [TranslationDto],
		example: [{ name: 'Cool Avatar Frame', language: 'en' }],
	})
	translations: TranslationDto[];

	@ApiProperty({
		example: ProfileItemType.AVATAR_FRAME,
		enum: ProfileItemType,
	})
	type: ProfileItemType;

	@ApiProperty({ example: false })
	isExclusive: boolean;

	@ApiProperty({ example: false })
	isAnimated: boolean;

	@ApiProperty({ example: 1000 })
	basePrice: number;

	@ApiProperty({ example: ItemRarity.COMMON, enum: ItemRarity })
	rarity: ItemRarity;

	@ApiProperty({ example: 'https://example.com/media/item-image.gif' })
	mediaUrl: string;

	@ApiProperty({ example: new Date() })
	createdAt: Date;

	@ApiProperty({ example: new Date() })
	updatedAt: Date;
}
