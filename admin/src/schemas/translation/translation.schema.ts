import z from 'zod';

export const translationSchema = z.object({
	language: z.string().min(2),
	name: z.string().min(2),
});
