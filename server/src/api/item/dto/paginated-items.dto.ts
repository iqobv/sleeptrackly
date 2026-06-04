import { PaginatedDataDto } from '@libs/dto';
import { Expose, Type } from 'class-transformer';
import { FullItemDto, ItemDto } from './item-response.dto';

export class PaginatedItemsDto extends PaginatedDataDto<ItemDto> {
	@Expose()
	@Type(() => ItemDto)
	declare items: ItemDto[];
}

export class FullPaginatedItemsDto extends PaginatedDataDto<FullItemDto> {
	@Expose()
	@Type(() => FullItemDto)
	declare items: FullItemDto[];
}
