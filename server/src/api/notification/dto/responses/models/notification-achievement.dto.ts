import { UserAchievementDto } from '@api/achievement/dto/responses/user-achievement.dto';
import { PickType } from '@nestjs/swagger';

export class NotificationAchievementDto extends PickType(UserAchievementDto, [
	'id',
	'translation',
]) {}
