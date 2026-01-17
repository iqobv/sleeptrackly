import { ApiProperty } from '@nestjs/swagger';
import { ShopBundleDto } from 'src/api/item/bundle/dto';
import { ShopItemDto } from 'src/api/item/dto';
import { ProductDto } from './product.dto';

export class FullProductDto extends ProductDto {
	@ApiProperty({ type: ShopItemDto, nullable: true })
	item: ShopItemDto | null;

	@ApiProperty({ type: [ShopBundleDto], nullable: true })
	bundle: ShopBundleDto[] | null;
}
