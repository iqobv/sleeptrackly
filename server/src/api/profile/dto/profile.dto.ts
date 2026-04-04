import { ApiProperty } from '@nestjs/swagger';
import { Friendship } from 'generated/prisma/client';
import { FriendshipDto } from 'src/api/friendship/dto';
import { CompactUserAvatarDto } from 'src/api/user-avatar/dto';
import { DefaultFieldsDto } from 'src/libs/dto';
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
