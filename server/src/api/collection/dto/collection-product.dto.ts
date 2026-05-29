import { FullProductDto } from '@api/product/dto';
import { DefaultFieldsDto } from '@libs/dto';
import { ApiProperty } from '@nestjs/swagger';

export class CollectionProductDto extends DefaultFieldsDto {
	@ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
	collectionId: string;

	@ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
	productId: string;
}

export class FullCollectionProductDto extends CollectionProductDto {
	@ApiProperty({ type: FullProductDto })
	product: FullProductDto;
}
