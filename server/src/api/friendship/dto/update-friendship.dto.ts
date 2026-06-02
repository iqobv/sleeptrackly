import { FriendshipStatus } from '@generated/prisma/enums';
import { IsEnum } from 'class-validator';

export class UpdateFriendshipDto {
	@IsEnum(FriendshipStatus, { message: 'Status is invalid' })
	status: FriendshipStatus;
}
