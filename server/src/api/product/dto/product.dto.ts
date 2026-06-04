import { BundleDto } from '@api/bundle/dto';
import { ItemDto } from '@api/item/dto';
import { Expose, Type } from 'class-transformer';
import { ProductEntityDto } from './product.entity.dto';

export class ProductDto extends ProductEntityDto {}

export class FullProductDto extends ProductEntityDto {
	@Expose()
	@Type(() => ItemDto)
	item: ItemDto | null;

	@Expose()
	@Type(() => BundleDto)
	bundle: BundleDto | null;
}
