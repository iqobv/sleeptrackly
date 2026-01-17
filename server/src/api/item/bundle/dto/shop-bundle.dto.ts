import { ApiProperty, OmitType } from '@nestjs/swagger';
import { TranslationDto } from 'src/libs/dto';
import { ShopItemDto } from '../../dto';
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
