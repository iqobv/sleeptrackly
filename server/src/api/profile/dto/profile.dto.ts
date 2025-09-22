import { ApiProperty } from '@nestjs/swagger';
import { CompactUserAvatarDto } from 'src/api/user-avatar/dto';

export class ProfileDto {
	@ApiProperty({ example: 'username' })
	username: string;

	@ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
	createdAt: Date;

	@ApiProperty({ type: CompactUserAvatarDto })
	avatar: CompactUserAvatarDto;

	@ApiProperty({ example: 0 })
	completedChallenges: number;

	@ApiProperty({ example: 0 })
	sleepEntries: number;
}
