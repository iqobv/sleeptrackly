import { BundleDto } from '@api/bundle/dto/bundle-response.dto';
import { ItemDto } from '@api/item/dto/item-response.dto';
import { ProductDto } from '@api/product/dto/product.dto';
import { Expose, Type } from 'class-transformer';
import { CollectionProductEntityDto } from './collection.entity.dto';

export class ProductDetailsDto extends ProductDto {
	@Expose()
	@Type(() => ItemDto)
	item: ItemDto | null;

	@Expose()
	@Type(() => BundleDto)
	bundle: BundleDto | null;
}

export class CollectionProductDto extends CollectionProductEntityDto {
	@Expose()
	@Type(() => ProductDetailsDto)
	product: ProductDetailsDto;
}
