import { ApiProperty } from '@nestjs/swagger';
import { FriendshipStatus } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class UpdateFriendshipDto {
	@ApiProperty({ example: FriendshipStatus.ACCEPTED })
	@IsEnum(FriendshipStatus, { message: 'Status is invalid' })
	status: FriendshipStatus;
}
