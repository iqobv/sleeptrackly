import { ITEM_RARITIES, ITEM_TYPES } from '@/constants';
import { translationSchema } from '@/schemas/translation/translation.schema';
import z from 'zod';

export const createItemSchema = z.object({
	isExclusive: z.boolean(),
	type: z.enum(ITEM_TYPES),
	basePrice: z.number().min(0),
	rarity: z.enum(ITEM_RARITIES),
	file: z.instanceof(File, { message: 'File is required' }),
	translations: z
		.array(translationSchema)
		.min(1, { message: 'At least one translation is required' }),
});
