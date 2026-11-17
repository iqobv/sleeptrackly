import { PickType } from '@nestjs/swagger';
import { AchievementEntityTranslationDto } from '../entities/achievement-translation.entity.dto';

export class AchievementTranslationDto extends PickType(
	AchievementEntityTranslationDto,
	['language', 'title', 'description'] as const,
) {}

export class FullAchievementTranslationDto extends AchievementEntityTranslationDto {}
