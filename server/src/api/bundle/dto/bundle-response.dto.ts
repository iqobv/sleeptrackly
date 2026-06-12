import { TranslationDto } from '@libs/dto/translation.dto';
import { Expose, Type } from 'class-transformer';
import { BundleItemDto } from './bundle-item.dto';
import { BundleEntityDto } from './bundle.entity.dto';

export class BaseBundleDto extends BundleEntityDto {}

export class BundleDto extends BundleEntityDto {
	@Expose()
	@Type(() => TranslationDto)
	translations: TranslationDto[];

	@Expose()
	@Type(() => BundleItemDto)
	items: BundleItemDto[];
}
