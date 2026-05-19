import z from 'zod';

export const usePromotionSchema = z.object({
	alias: z
		.string()
		.min(5, { error: 'Alias must be at least 5 characters long' }),
});
