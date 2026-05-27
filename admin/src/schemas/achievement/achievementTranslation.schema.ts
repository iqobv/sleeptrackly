import z from 'zod';

export const achievementTranslationSchema = z.object({
	language: z
		.string()
		.min(2, { message: 'Language code must be at least 2 characters long' })
		.default('en'),
	title: z
		.string()
		.min(2, { message: 'Title must be at least 2 characters long' }),
	description: z
		.string()
		.min(2, { message: 'Description must be at least 2 characters long' }),
});
