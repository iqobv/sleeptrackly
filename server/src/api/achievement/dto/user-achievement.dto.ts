import { OmitType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { AchievementTranslationDto } from './achievement-translation.dto';
import { AchievementDto } from './achievement.dto';

class UserAchievementRewardProductDto {
	name: string;
}

export class UserAchievementDto extends OmitType(AchievementDto, [
	'isHidden',
] as const) {
	@Expose() isAchieved: boolean;
	@Expose() achievedAt: Date | null;
	@Expose() translation: AchievementTranslationDto;
	@Expose() rewardProduct: UserAchievementRewardProductDto | null;
}
