import { FriendshipStatus } from '@generated/prisma/enums';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export class UpdateFriendshipDto {
	@ApiProperty({ enum: FriendshipStatus, enumName: 'FriendshipStatus' })
	@IsEnum(FriendshipStatus, { message: 'Status is invalid' })
	status: FriendshipStatus;
}
