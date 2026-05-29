import { translationSchema } from '@/schemas/translation';
import z from 'zod';

export const baseCollectionSchema = z.object({
	slug: z
		.string()
		.min(4, { error: 'Slug must be at least 4 characters' })
		.slugify(),
	showInStore: z.boolean(),
	accentColor: z
		.string()
		.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Invalid hex color'),
	productIds: z
		.array(z.uuidv4())
		.min(1, { error: 'At least one product must be selected' }),
	translations: z
		.array(translationSchema)
		.min(1, { error: 'At least one translation is required' }),
	icon: z.instanceof(File, { message: 'File is required' }),
});
