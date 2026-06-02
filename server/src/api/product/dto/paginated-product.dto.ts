import { ShopProductDto } from '@api/shop/dto';
import { PaginatedDataDto } from '@libs/dto';
import { Expose, Type } from 'class-transformer';
import { FullProductDto, ProductDto } from './product.dto';

export class PaginatedProductDto extends PaginatedDataDto<ProductDto> {
	@Expose()
	@Type(() => ProductDto)
	declare items: ProductDto[];
}

export class PaginatedShopProductDto extends PaginatedDataDto<ShopProductDto> {
	@Expose()
	@Type(() => ShopProductDto)
	declare items: ShopProductDto[];
}

export class PaginatedFullProductDto extends PaginatedDataDto<FullProductDto> {
	@Expose()
	@Type(() => FullProductDto)
	declare items: FullProductDto[];
}
