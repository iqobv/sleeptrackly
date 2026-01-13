import { ApiProperty } from '@nestjs/swagger';
import { PaginatedDataDto } from 'src/libs/dtos';
import { UserInventoryItemDto } from './user-inventory.dto';

export class PaginatedUserInventoryDto extends PaginatedDataDto<UserInventoryItemDto> {
	@ApiProperty({ type: [UserInventoryItemDto] })
	declare items: UserInventoryItemDto[];
}
