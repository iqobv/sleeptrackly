import { ApiProperty } from '@nestjs/swagger';
import { ItemDto } from '../../dto';

export class BundleDto {
	@ApiProperty({ example: '51e2c506-4e67-4d3c-811d-b64e7ddf4c61' })
	id: string;

	@ApiProperty({ example: 'Starter Pack' })
	name: string;

	@ApiProperty({ example: false })
	isLimited: boolean;

	@ApiProperty({ example: true })
	isShowInStore: boolean;

	@ApiProperty({ example: true })
	isNew: boolean;

	@ApiProperty({ example: true })
	isPopular: boolean;

	@ApiProperty({ example: 1200 })
	price: number;

	@ApiProperty({ example: null })
	maxStock: number | null;

	@ApiProperty({ example: 1000 })
	discountedPrice: number;

	@ApiProperty({ example: 500 })
	soldCount: number;

	@ApiProperty({ example: 'https://example.com/media/bundle-image.png' })
	mediaUrl: string;

	@ApiProperty({ example: new Date().toISOString() })
	expiresAt: Date | null;

	@ApiProperty({ example: new Date().toISOString() })
	createdAt: Date;

	@ApiProperty({ example: new Date().toISOString() })
	updatedAt: Date;
}

export class FullBundleDto extends BundleDto {
	@ApiProperty({ type: [ItemDto] })
	items: ItemDto[];
}
