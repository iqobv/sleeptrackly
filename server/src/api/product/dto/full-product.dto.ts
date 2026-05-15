import { ShopBundleDto } from '@api/item/bundle/dto';
import { ShopItemDto } from '@api/item/dto';
import { ApiProperty } from '@nestjs/swagger';
import { ProductDto } from './product.dto';

export class FullProductDto extends ProductDto {
	@ApiProperty({ type: ShopItemDto, nullable: true })
	item: ShopItemDto | null;

	@ApiProperty({ type: [ShopBundleDto], nullable: true })
	bundle: ShopBundleDto[] | null;
}
