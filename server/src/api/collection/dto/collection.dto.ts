import { DefaultFieldsDto } from '@libs/dto';
import { ApiProperty } from '@nestjs/swagger';
import { FullCollectionProductDto } from './collection-product.dto';
import { FullCollectionTranslationDto } from './collection-translation.dto';

export class CollectionDto extends DefaultFieldsDto {
	@ApiProperty({ example: 'example-collection' })
	slug: string;

	@ApiProperty({ example: '/collections/placeholder-image.jpg' })
	backgroundImage: string;

	@ApiProperty({ example: true })
	showInStore: boolean;
}

export class FullCollectionDto extends CollectionDto {
	@ApiProperty({ type: [FullCollectionTranslationDto] })
	translations: FullCollectionTranslationDto[];

	@ApiProperty({ type: [FullCollectionProductDto] })
	products: FullCollectionProductDto[];
}

export class StoreCollectionDto {
	@ApiProperty({ example: 'Example Collection' })
	name: string;

	@ApiProperty({ example: 'example-collection' })
	slug: string;
}
