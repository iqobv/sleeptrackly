import { PaginatedDataDto } from '@libs/dto/paginated-data.dto';
import { Expose, Type } from 'class-transformer';
import { CollectionProductDto } from './collection-product.dto';
import { FullCollectionTranslationDto } from './collection-translation.dto';
import { CollectionEntityDto } from './collection.entity.dto';

export class CollectionDto extends CollectionEntityDto {}

export class FullCollectionDto extends CollectionEntityDto {
	@Expose()
	@Type(() => FullCollectionTranslationDto)
	translations: FullCollectionTranslationDto[];

	@Expose()
	@Type(() => CollectionProductDto)
	products: CollectionProductDto[];
}

export class StoreCollectionDto {
	@Expose() name: string;
	@Expose() slug: string;
}

export class PaginatedCollectionsDto extends PaginatedDataDto<CollectionDto> {
	@Expose()
	@Type(() => CollectionDto)
	declare items: CollectionDto[];
}
