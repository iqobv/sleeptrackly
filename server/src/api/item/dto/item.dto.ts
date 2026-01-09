import { ApiProperty } from '@nestjs/swagger';
import { ProfileItemType } from '@prisma/client';

export class ItemDto {
	@ApiProperty({
		example: 'b3f71cf8-b1eb-4c8f-909e-e4454cb95a4a',
	})
	id: string;

	@ApiProperty({
		example: 'Sample Item Name',
	})
	name: string | null;

	@ApiProperty({
		example: ProfileItemType.AVATAR_FRAME,
		enum: ProfileItemType,
	})
	type: ProfileItemType;

	@ApiProperty({
		example: false,
	})
	isLimited: boolean;

	@ApiProperty({
		example: true,
	})
	isShowInStore: boolean;

	@ApiProperty({
		example: true,
	})
	isNew: boolean;

	@ApiProperty({
		example: true,
	})
	isPopular: boolean;

	@ApiProperty({
		example: true,
	})
	isExclusive: boolean;

	@ApiProperty({
		example: 100,
	})
	price: number;

	@ApiProperty({
		example: 50,
	})
	maxStock: number | null;

	@ApiProperty({
		example: 80,
	})
	discountedPrice: number;

	@ApiProperty({
		example: 200,
	})
	soldCount: number;

	@ApiProperty({
		example: 'https://example.com/media/item-image.gif',
	})
	mediaUrl: string;

	@ApiProperty({
		example: new Date(),
	})
	expiresAt: Date | null;

	@ApiProperty({
		example: new Date(),
	})
	createdAt: Date;

	@ApiProperty({
		example: new Date(),
	})
	updatedAt: Date;
}
