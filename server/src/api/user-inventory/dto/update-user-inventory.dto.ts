import { OmitType } from '@nestjs/swagger';
import { CreateUserInventoryDto } from './create-user-inventory.dto';

export class UpdateUserInvetoryDto extends OmitType(CreateUserInventoryDto, [
	'acquiredAt',
	'acquiredFrom',
	'itemId',
	'userId',
] as const) {}
