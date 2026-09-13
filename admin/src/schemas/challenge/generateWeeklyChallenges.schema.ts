import { z } from 'zod';

export const generateWeeklyChallengesSchema = z.object({
	currentWeek: z.boolean().optional(),
});
