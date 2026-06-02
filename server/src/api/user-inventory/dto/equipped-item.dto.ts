import { ItemEntityDto } from '@api/item/dto/item.entity.dto';
import { PickType } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserInventoryEntityDto } from './user-inventory.entity.dto';

export class EquippedItemDetailsDto extends PickType(ItemEntityDto, [
	'id',
	'type',
	'mediaUrl',
	'isAnimated',
] as const) {}

export class UserEquippedItemDto extends PickType(UserInventoryEntityDto, [
	'id',
] as const) {
	@Expose()
	@Type(() => EquippedItemDetailsDto)
	item: EquippedItemDetailsDto;
}
