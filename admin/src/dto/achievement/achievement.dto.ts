import { achievementTranslationSchema } from '@/schemas/achievement/achievementTranslation.schema';
import { baseAchievementSchema } from '@/schemas/achievement/baseAchievement.schema';
import { createAchievementSchema } from '@/schemas/achievement/createAchievement.schema';
import { updateAchievementSchema } from '@/schemas/achievement/updateAchievement.schema';
import z from 'zod';

export type CreateAchievementDto = z.infer<typeof createAchievementSchema>;
export type UpdateAchievementDto = z.infer<typeof updateAchievementSchema>;
export type BaseAchievementDto = z.infer<typeof baseAchievementSchema>;
export type AchievementTranslationDto = z.infer<
	typeof achievementTranslationSchema
>;
