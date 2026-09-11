import { PaginatedDataDto } from '@libs/dto/paginated-data.dto';
import { Expose, Type } from 'class-transformer';
import { UserInventoryItemDto } from './user-inventory.dto';

export class PaginatedUserInventoryDto extends PaginatedDataDto<UserInventoryItemDto> {
	@Expose()
	@Type(() => UserInventoryItemDto)
	declare items: UserInventoryItemDto[];
}
