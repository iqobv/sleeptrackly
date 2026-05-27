import { AchievementType } from '@generated/prisma/enums';
import { DefaultFieldsDto } from '@libs/dto';
import { ApiProperty } from '@nestjs/swagger';
import { FullAchievementTranslationDto } from './achievement-translation.dto';

export class AchievementDto extends DefaultFieldsDto {
	@ApiProperty({ example: AchievementType.SLEEP_COUNT, enum: AchievementType })
	type: AchievementType;

	@ApiProperty({ example: 10 })
	targetValue: number;

	@ApiProperty({ example: 'placeholders/achievement.png' })
	iconUrl: string;

	@ApiProperty({ example: true })
	isActive: boolean;

	@ApiProperty({ example: false })
	isHidden: boolean;

	@ApiProperty({ example: 0 })
	rewardCoins: number;

	@ApiProperty({ example: 'uuid' })
	rewardProductId: string | null;

	@ApiProperty({ type: [FullAchievementTranslationDto] })
	translations: FullAchievementTranslationDto[];
}
