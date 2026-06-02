import { UserAvatarEntityDto } from '@api/user-avatar/dto';
import { PickType } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserEntityDto } from './user.entity.dto';

export class AvatarSearchDto extends PickType(UserAvatarEntityDto, [
	'url',
] as const) {}

export class UsersSearchResultDto extends PickType(UserEntityDto, [
	'id',
	'username',
] as const) {
	@Expose()
	@Type(() => AvatarSearchDto)
	declare avatar: AvatarSearchDto | null;
}
