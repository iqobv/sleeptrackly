import { FriendshipDto } from '@api/friendship/dto';
import { CompactUserAvatarDto } from '@api/user-avatar/dto';
import { Friendship } from '@generated/prisma/client';
import { DefaultFieldsDto } from '@libs/dto';
import { ApiProperty } from '@nestjs/swagger';
import { ProfileStatistics } from './profile-statistics.dto';

export class ProfileDto extends DefaultFieldsDto {
	@ApiProperty({ example: 'username' })
	username: string;

	@ApiProperty({ type: FriendshipDto })
	friendship: Friendship | null;

	@ApiProperty({ type: ProfileStatistics })
	statistics: ProfileStatistics | null;

	@ApiProperty({ type: CompactUserAvatarDto })
	avatar: CompactUserAvatarDto;
}
