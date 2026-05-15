import { PaginatedDataDto } from '@libs/dto';
import { ApiProperty } from '@nestjs/swagger';
import { ItemDto } from './item.dto';

export class PaginatedItemsDto extends PaginatedDataDto<ItemDto> {
	@ApiProperty({ type: [ItemDto] })
	declare items: ItemDto[];
}
