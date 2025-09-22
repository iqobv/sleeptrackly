import { OmitType } from '@nestjs/swagger';
import { UserAvatarDto } from './user-avatar.dto';

export class CompactUserAvatarDto extends OmitType(UserAvatarDto, [
	'id',
	'userId',
] as const) {}
