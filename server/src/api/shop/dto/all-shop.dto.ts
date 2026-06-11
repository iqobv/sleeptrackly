import { PaginatedDataDto } from '@libs/dto/paginated-data.dto';
import { Expose, Type } from 'class-transformer';
import { ShopProductDto } from './shop-product.dto';

export class AllShopDto extends PaginatedDataDto<ShopProductDto> {
	@Expose()
	@Type(() => ShopProductDto)
	declare items: ShopProductDto[];
}
