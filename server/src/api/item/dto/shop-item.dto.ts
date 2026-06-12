import { TranslationDto } from '@libs/dto/translation.dto';
import { OmitType } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ItemDto } from './item-response.dto';

export class ShopItemDto extends OmitType(ItemDto, ['translations'] as const) {
	@Expose()
	@Type(() => TranslationDto)
	translation: TranslationDto;
}
