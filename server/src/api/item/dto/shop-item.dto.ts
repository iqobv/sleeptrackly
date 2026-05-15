import { TranslationDto } from '@libs/dto';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { ItemDto } from './item.dto';

export class ShopItemDto extends OmitType(ItemDto, ['translations'] as const) {
	@ApiProperty({
		type: TranslationDto,
		example: { name: 'Cool Avatar Frame', language: 'en' },
	})
	translation: TranslationDto;
}
