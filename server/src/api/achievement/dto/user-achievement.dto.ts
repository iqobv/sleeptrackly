import { ApiProperty, OmitType } from '@nestjs/swagger';
import { AchievementTranslationDto } from './achievement-translation.dto';
import { AchievementDto } from './achievement.dto';

export class UserAchievementDto extends OmitType(AchievementDto, [
	'translations',
	'isHidden',
] as const) {
	@ApiProperty({ type: AchievementTranslationDto })
	translation: AchievementTranslationDto;
}
