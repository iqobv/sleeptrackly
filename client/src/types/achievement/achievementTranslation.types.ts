import { DefaultFields } from '../defaultFields.types';

export interface AchievementTranslation {
	language: string;
	title: string;
	description: string;
}

export interface FullAchievementTranslation
	extends DefaultFields, AchievementTranslation {
	achievementId: string;
}
