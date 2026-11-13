import { PickType } from '@nestjs/swagger';
import { UserSanctionEntityDto } from './user-sanction.entity.dto';

export class UserSanctionDto extends UserSanctionEntityDto {}

export class BaseUserSanctionDto extends PickType(UserSanctionDto, [
	'id',
	'endsAt',
	'type',
	'reportId',
] as const) {}
