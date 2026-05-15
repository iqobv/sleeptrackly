import { FriendshipStatus } from '@generated/prisma/enums';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export class UpdateFriendshipDto {
	@ApiProperty({ example: FriendshipStatus.ACCEPTED })
	@IsEnum(FriendshipStatus, { message: 'Status is invalid' })
	status: FriendshipStatus;
}
