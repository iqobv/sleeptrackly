import { OmitType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { AchievementEntityDto } from '../entities/achievement.entity.dto';

@Exclude()
export class AchievementDto extends OmitType(AchievementEntityDto, [
	'translations',
	'rewardProduct',
] as const) {}

export class FullAchievementDto extends AchievementEntityDto {}
