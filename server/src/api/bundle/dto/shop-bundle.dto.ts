import { ShopItemDto } from '@api/item/dto/shop-item.dto';
import { TranslationDto } from '@libs/dto/translation.dto';
import { Expose, Type } from 'class-transformer';
import { BundleEntityDto, BundleItemEntityDto } from './bundle.entity.dto';

export class ShopBundleItemDto extends BundleItemEntityDto {
	@Expose()
	@Type(() => ShopItemDto)
	item: ShopItemDto;
}

export class ShopBundleDto extends BundleEntityDto {
	@Expose()
	@Type(() => TranslationDto)
	translation: TranslationDto;

	@Expose()
	@Type(() => ShopBundleItemDto)
	items: ShopBundleItemDto[];
}
