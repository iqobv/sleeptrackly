import { ProductDto } from '@api/product/dto';
import { DefaultFieldsDto } from '@libs/dto';
import { ApiProperty } from '@nestjs/swagger';

export class CollectionItemDto extends DefaultFieldsDto {
	@ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
	collectionId: string;

	@ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
	productId: string;
}

export class CollectionItemWithProductDto extends CollectionItemDto {
	@ApiProperty({ type: ProductDto })
	product: ProductDto;
}
