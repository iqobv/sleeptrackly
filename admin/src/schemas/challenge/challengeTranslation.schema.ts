import { z } from 'zod';

export const challengeTranslationSchema = z.object({
	language: z
		.string()
		.min(2, 'Language code must be at least 2 characters long'),
	title: z.string().min(1, 'Title is required'),
	description: z.string().min(1, 'Description is required'),
});
