import { Expose, Type } from 'class-transformer';
import { FriendDto, FriendRequestDto } from './friend.dto';

class BaseUserFriendDto {
	@Expose() countOfPendingRequests: number;
}

export class UserFriendsDto extends BaseUserFriendDto {
	@Expose()
	@Type(() => FriendDto)
	friends: FriendDto[];
}

export class UserFriendRequestsDto extends BaseUserFriendDto {
	@Expose()
	@Type(() => FriendRequestDto)
	friends: FriendRequestDto[];
}
