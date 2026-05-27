import { ApiProperty, OmitType } from '@nestjs/swagger';
import { AchievementTranslationDto } from './achievement-translation.dto';
import { AchievementDto } from './achievement.dto';

class UserAchievementRewardProductDto {
	@ApiProperty({ example: 'Product Name' })
	name: string;
}

export class UserAchievementDto extends OmitType(AchievementDto, [
	'translations',
	'isHidden',
] as const) {
	@ApiProperty({ type: AchievementTranslationDto })
	translation: AchievementTranslationDto;

	@ApiProperty({ type: UserAchievementRewardProductDto, nullable: true })
	rewardProduct: UserAchievementRewardProductDto | null;
}
