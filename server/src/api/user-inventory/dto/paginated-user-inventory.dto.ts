import { PaginatedDataDto } from '@libs/dto';
import { ApiProperty } from '@nestjs/swagger';
import { UserInventoryItemDto } from './user-inventory.dto';

export class PaginatedUserInventoryDto extends PaginatedDataDto<UserInventoryItemDto> {
	@ApiProperty({ type: [UserInventoryItemDto] })
	declare items: UserInventoryItemDto[];
}
