import { FullItemDto } from '@api/item/dto';
import { ItemEntityDto } from '@api/item/dto/item.entity.dto';
import { TranslationDto } from '@libs/dto';
import { PickType } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserInventoryEntityDto } from './user-inventory.entity.dto';

export class UserInventoryDto extends UserInventoryEntityDto {}

export class InventoryItemDetailsDto extends PickType(ItemEntityDto, [
	'id',
	'type',
	'mediaUrl',
	'isAnimated',
	'rarity',
] as const) {
	@Expose()
	@Type(() => TranslationDto)
	translation: TranslationDto;
}

export class UserInventoryItemDto extends UserInventoryEntityDto {
	@Expose()
	@Type(() => InventoryItemDetailsDto)
	item: InventoryItemDetailsDto;
}

export class FullUserInventoryItemDto extends UserInventoryEntityDto {
	@Expose()
	@Type(() => FullItemDto)
	item: FullItemDto;
}
