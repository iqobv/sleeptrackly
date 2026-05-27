import { ITEM_RARITIES, ITEM_TYPES } from '@/constants';
import { translationSchema } from '@/schemas/translation/translation.schema';
import z from 'zod';

export const createItemSchema = z.object({
	isExclusive: z.boolean(),
	type: z.enum(ITEM_TYPES),
	basePrice: z.coerce.number().min(0),
	rarity: z.enum(ITEM_RARITIES),
	translations: z
		.array(translationSchema)
		.min(1, { message: 'At least one translation is required' }),
	media: z.instanceof(File, { message: 'File is required' }),
	preview: z.instanceof(File, { message: 'File is required' }),
});
