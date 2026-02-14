import { translationSchema } from '@/schemas/translation/translation.schema';
import z from 'zod';

export const createBundleSchema = z.object({
	isExclusive: z.boolean(),
	discountPercentage: z.number().min(0).max(100),
	file: z.instanceof(File, { message: 'File is required' }),
	itemsIds: z.array(z.uuidv4()).min(1, 'At least one item must be selected'),
	translations: z
		.array(translationSchema)
		.min(1, 'At least one translation is required'),
});
