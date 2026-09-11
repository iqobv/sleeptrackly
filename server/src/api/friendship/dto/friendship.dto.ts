import { UserEntityDto } from '@api/user/dto/user.entity.dto';
import { PickType } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { FriendshipEntityDto } from './friendship.entity.dto';

export class BaseFriendshipDto extends FriendshipEntityDto {}

export class FriendshipUserSleepStatusDto {
	@Expose() isSleeping: boolean;
}

export class FriendshipUserDto extends PickType(UserEntityDto, [
	'id',
	'username',
	'avatar',
	'userPrivacySettings',
] as const) {
	@Expose()
	@Type(() => FriendshipUserSleepStatusDto)
	sleepStatus: FriendshipUserSleepStatusDto | null;
}

export class FriendshipDto extends FriendshipEntityDto {
	@Expose()
	@Type(() => FriendshipUserDto)
	requester: FriendshipUserDto;
}

export class FullFriendshipDto extends FriendshipDto {
	@Expose()
	@Type(() => FriendshipUserDto)
	addressee: FriendshipUserDto;
}
