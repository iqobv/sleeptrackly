import { FriendUserDto } from '@api/friendship/dto/friend.dto';
import { PickType } from '@nestjs/swagger';

export class NotificationFriendshipDto extends PickType(FriendUserDto, [
	'id',
	'username',
]) {}
