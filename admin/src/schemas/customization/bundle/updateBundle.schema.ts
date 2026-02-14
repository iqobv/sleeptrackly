import { translationSchema } from '@/schemas/translation/translation.schema';
import z from 'zod';
import { createBundleSchema } from './createBundle.schema';

export const updateBundleSchema = createBundleSchema.partial().extend({
	file: z.instanceof(File).optional().nullable(),
	translations: z
		.array(translationSchema.partial())
		.min(1, 'At least one translation is required'),
});
