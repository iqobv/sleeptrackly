import z from 'zod';

export const translationSchema = z.object({
	language: z
		.string()
		.min(2, { error: 'Language code must be at least 2 characters' }),
	name: z.string().min(2, { error: 'Name must be at least 2 characters' }),
});
