import z from 'zod';

export const languageQuerySchema = z.object({
	language: z.string().optional().default('en'),
});
