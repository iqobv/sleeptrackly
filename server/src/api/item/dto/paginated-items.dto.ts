import { ApiProperty } from '@nestjs/swagger';
import { PaginatedDataDto } from 'src/libs/dtos';
import { ItemDto } from './item.dto';

export class PaginatedItemsDto extends PaginatedDataDto<ItemDto> {
	@ApiProperty({ type: [ItemDto] })
	declare items: ItemDto[];
}
