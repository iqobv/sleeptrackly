import { ShopBundleDto } from '@api/bundle/dto/shop-bundle.dto';
import { ShopItemDto } from '@api/item/dto/shop-item.dto';
import { ProductEntityDto } from '@api/product/dto/product.entity.dto';
import { Expose, Type } from 'class-transformer';

export class ShopProductDto extends ProductEntityDto {
	@Expose() isOwned: boolean;

	@Expose()
	@Type(() => ShopItemDto)
	item: ShopItemDto | null;

	@Expose()
	@Type(() => ShopBundleDto)
	bundle: ShopBundleDto | null;
}
