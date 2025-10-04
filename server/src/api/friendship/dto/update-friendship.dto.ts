import { FriendshipStatus } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class UpdateFriendshipDto {
	@IsEnum(FriendshipStatus, { message: 'Status is invalid' })
	status: FriendshipStatus;
}
