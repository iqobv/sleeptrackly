import { CollectionEntityDto } from '@api/collection/dto/collection.entity.dto';
import { ProfileItemType } from '@generated/prisma/enums';
import { PickType } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ShopProductDto } from './shop-product.dto';

export class ShopSectionDto {
	@Expose() itemType: ProfileItemType;

	@Expose()
	@Type(() => ShopProductDto)
	items: ShopProductDto[];
}

export class ShopCollectionProductDto {
	@Expose() collectionId: string;
	@Expose() productId: string;

	@Expose()
	@Type(() => ShopProductDto)
	product: ShopProductDto;
}

export class ShopFeaturedCollectionDto extends PickType(CollectionEntityDto, [
	'id',
	'slug',
	'accentColor',
	'iconUrl',
	'showInStore',
] as const) {
	@Expose() name: string;

	@Expose()
	@Type(() => ShopCollectionProductDto)
	products: ShopCollectionProductDto[];
}

export class FeaturedShopDto {
	@Expose()
	@Type(() => ShopProductDto)
	carousel: ShopProductDto[];

	@Expose()
	@Type(() => ShopFeaturedCollectionDto)
	collections: ShopFeaturedCollectionDto[];

	@Expose()
	@Type(() => ShopSectionDto)
	sections: ShopSectionDto[];
}
