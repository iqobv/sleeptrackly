import { ApiProperty } from '@nestjs/swagger';
import { FriendshipStatus } from 'generated/prisma/enums';

export class FriendshipDto {
	@ApiProperty({ example: 'a81bc81b-dead-4e5d-abff-90865d1e13b1' })
	id: string;

	@ApiProperty({ example: 'a81bc81b-dead-4e5d-abff-90865d1e13b1' })
	requesterId: string;

	@ApiProperty({ example: 'a81bc81b-dead-4e5d-abff-90865d1e13b1' })
	addresseeId: string;

	@ApiProperty({ example: FriendshipStatus.PENDING, enum: FriendshipStatus })
	status: FriendshipStatus;
}
