import z from 'zod';

export const usePromotionSchema = z.object({
	alias: z.string().min(5),
});
