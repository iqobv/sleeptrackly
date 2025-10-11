import { ApiProperty } from '@nestjs/swagger';
import { Friendship } from '@prisma/client';
import { FriendshipDto } from 'src/api/friendship/dto';
import { CompactUserAvatarDto } from 'src/api/user-avatar/dto';

export class ProfileDto {
	@ApiProperty({ example: 'a81bc81b-dead-4e5d-abff-90865d1e13b1' })
	id: string;

	@ApiProperty({ example: 'username' })
	username: string;

	@ApiProperty({ type: FriendshipDto })
	friendship: Friendship | null;

	@ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
	createdAt: Date;

	@ApiProperty({ type: CompactUserAvatarDto })
	avatar: CompactUserAvatarDto;

	@ApiProperty({ example: 0 })
	completedChallenges: number;

	@ApiProperty({ example: 0 })
	sleepEntries: number;
}
