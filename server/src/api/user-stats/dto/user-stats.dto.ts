import { OmitType } from '@nestjs/swagger';
import { UserStatsEntityDto } from './user-stats.entity.dto';

export class BaseUserStatsDto extends OmitType(UserStatsEntityDto, [
	'activeStreak',
] as const) {}

export class BaseUserStatsWithoutUserIdDto extends OmitType(
	UserStatsEntityDto,
	['userId', 'updatedAt'] as const,
) {}

export class UserStatsDto extends UserStatsEntityDto {}
