import { TranslationDto } from '@libs/dto';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { ShopItemDto } from '../../item/dto';
import { BundleDto } from './bundle.dto';

export class ShopBundleDto extends OmitType(BundleDto, [
	'translations',
] as const) {
	@ApiProperty({
		type: TranslationDto,
		example: { name: 'Cool Bundle', language: 'en' },
	})
	translation: TranslationDto;

	@ApiProperty({ type: [ShopItemDto] })
	items: ShopItemDto[];
}
