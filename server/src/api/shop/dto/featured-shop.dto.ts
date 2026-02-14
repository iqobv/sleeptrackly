import { ApiProperty } from '@nestjs/swagger';
import { FullProductDto } from 'src/api/product/dto';

export class FeaturedShopDto {
	@ApiProperty({ type: [FullProductDto] })
	items: FullProductDto[];

	@ApiProperty({ type: [FullProductDto] })
	bundles: FullProductDto[];
}
