import { AchievementType } from '@/types';
import z from 'zod';
import { achievementTranslationSchema } from './achievementTranslation.schema';

export const baseAchievementSchema = z.object({
	type: z.enum(AchievementType),
	targetValue: z.coerce
		.number()
		.min(0, { message: 'Target value must be a non-negative number' }),
	isActive: z.boolean().optional().default(true),
	isHidden: z.boolean().optional().default(false),
	rewardCoins: z.coerce.number().min(0).optional().default(0),
	rewardProductId: z.uuidv4().nullable().optional().default(null),
	icon: z.instanceof(File, { message: 'Icon file is required' }).optional(),
	translations: z
		.array(achievementTranslationSchema)
		.min(1, { message: 'At least one translation is required' }),
});
