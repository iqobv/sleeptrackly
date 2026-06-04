import { OmitType } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { AchievementTranslationDto } from './achievement-translation.dto';
import { AchievementDto } from './achievement.dto';

class UserAchievementRewardProductDto {
	@Expose() name: string;
}

export class UserAchievementDto extends OmitType(AchievementDto, [
	'isHidden',
] as const) {
	@Expose() isAchieved: boolean;
	@Expose() achievedAt: Date | null;

	@Expose()
	@Type(() => AchievementTranslationDto)
	translation: AchievementTranslationDto;

	@Expose()
	@Type(() => UserAchievementRewardProductDto)
	rewardProduct: UserAchievementRewardProductDto | null;
}
