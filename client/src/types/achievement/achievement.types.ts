import { DefaultFields } from '../defaultFields.types';
import {
	AchievementTranslation,
	FullAchievementTranslation,
} from './achievementTranslation.types';
import { AchievementType } from './achievementType.types';

export interface UserAchievementRewardProduct {
	name: string;
}

export interface BaseAchievement extends DefaultFields {
	type: AchievementType;
	targetValue: number;
	iconUrl: string;
	isActive: boolean;
	rewardCoins: number;
	rewardProductId: string | null;
}

export interface Achievement extends BaseAchievement {
	isAchieved: boolean;
	translation: AchievementTranslation;
	rewardProduct: UserAchievementRewardProduct | null;
	achievedAt: Date;
}

export interface FullAchievement extends BaseAchievement {
	isHidden: boolean;
	translations: FullAchievementTranslation[];
}
