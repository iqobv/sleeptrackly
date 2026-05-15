import { FullProductDto } from '@api/product/dto';
import { ApiProperty } from '@nestjs/swagger';

export class FeaturedShopDto {
	@ApiProperty({ type: [FullProductDto] })
	items: FullProductDto[];

	@ApiProperty({ type: [FullProductDto] })
	bundles: FullProductDto[];
}
