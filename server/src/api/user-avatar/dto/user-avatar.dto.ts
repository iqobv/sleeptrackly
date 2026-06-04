import { OmitType } from '@nestjs/swagger';
import { UserAvatarEntityDto } from './user-avatar.entity.dto';

export class UserAvatarDto extends UserAvatarEntityDto {}
export class BaseUserAvatarDto extends OmitType(UserAvatarEntityDto, [
	'id',
	'createdAt',
	'updatedAt',
	'userId',
] as const) {}
