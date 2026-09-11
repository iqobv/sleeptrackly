import { StoreCollectionDto } from '@api/collection/dto/collection.dto';
import { Expose, Type } from 'class-transformer';

export class PriceRangeDto {
	@Expose() min: number;
	@Expose() max: number;
}

export class FiltersDto {
	@Expose()
	@Type(() => PriceRangeDto)
	priceRange: PriceRangeDto;

	@Expose()
	@Type(() => StoreCollectionDto)
	collections: StoreCollectionDto[];
}
