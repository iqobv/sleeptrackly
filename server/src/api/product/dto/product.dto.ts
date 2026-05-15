import { ProductType, ProfileItemType } from '@generated/prisma/enums';
import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
	@ApiProperty({ example: '33be67ed-31e1-455d-bd0b-9f171264916e' })
	id: string;

	@ApiProperty({ example: ProductType.ITEM, enum: ProductType })
	type: ProductType;

	@ApiProperty({ example: ProfileItemType.AVATAR_FRAME, enum: ProfileItemType })
	itemType: ProfileItemType | null;

	@ApiProperty({ example: null })
	bundleId: string | null;

	@ApiProperty({ example: '33be67ed-31e1-455d-bd0b-9f171264916e' })
	itemId: string | null;

	@ApiProperty({ example: true })
	isNew: boolean;

	@ApiProperty({ example: true })
	isPopular: boolean;

	@ApiProperty({ example: false })
	isExclusive: boolean;

	@ApiProperty({ example: true })
	isShowInStore: boolean;

	@ApiProperty({ example: true })
	isLimited: boolean;

	@ApiProperty({ example: 1000 })
	price: number;

	@ApiProperty({ example: null })
	discountedPrice: number | null;

	@ApiProperty({ example: 200 })
	maxStock: number | null;

	@ApiProperty({ example: 180 })
	soldCount: number;

	@ApiProperty({ example: new Date() })
	expiresAt: Date | null;

	@ApiProperty({ example: new Date() })
	createdAt: Date;

	@ApiProperty({ example: new Date() })
	updatedAt: Date;
}
