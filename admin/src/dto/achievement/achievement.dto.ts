import {
	achievementTranslationSchema,
	baseAchievementSchema,
	createAchievementSchema,
	updateAchievementSchema,
} from '@/schemas';
import z from 'zod';

export type CreateAchievementDto = z.infer<typeof createAchievementSchema>;
export type UpdateAchievementDto = z.infer<typeof updateAchievementSchema>;
export type BaseAchievementDto = z.infer<typeof baseAchievementSchema>;
export type AchievementTranslationDto = z.infer<
	typeof achievementTranslationSchema
>;
