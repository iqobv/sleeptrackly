import { FullTranslationDto, TranslationDto } from '@libs/dto/translation.dto';
import { Expose, Type } from 'class-transformer';
import { ItemEntityDto } from './item.entity.dto';

export class ItemDto extends ItemEntityDto {
	@Expose()
	@Type(() => TranslationDto)
	translations: TranslationDto[];
}

export class FullItemDto extends ItemEntityDto {
	@Expose()
	@Type(() => FullTranslationDto)
	translations: FullTranslationDto[];
}
