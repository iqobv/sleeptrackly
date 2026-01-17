import { ApiProperty } from '@nestjs/swagger';
import { TranslationDto } from 'src/libs/dto';
import { ItemDto } from '../../dto';

export class BundleDto {
	@ApiProperty({ example: '51e2c506-4e67-4d3c-811d-b64e7ddf4c61' })
	id: string;

	@ApiProperty({
		type: [TranslationDto],
		example: [{ name: 'Cool Avatar Frame', language: 'en' }],
	})
	translations: TranslationDto[];

	@ApiProperty({ example: 1200 })
	basePrice: number;

	@ApiProperty({ example: 20 })
	discountedPercent: number;

	@ApiProperty({ example: 'https://example.com/media/bundle-image.png' })
	mediaUrl: string;

	@ApiProperty({ example: new Date().toISOString() })
	createdAt: Date;

	@ApiProperty({ example: new Date().toISOString() })
	updatedAt: Date;
}

export class FullBundleDto extends BundleDto {
	@ApiProperty({ type: [ItemDto] })
	items: ItemDto[];
}
