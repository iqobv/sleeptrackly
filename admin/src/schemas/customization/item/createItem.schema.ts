import { translationSchema } from '@/schemas/translation/translation.schema';
import { ItemRarity } from '@/types/customization/item/itemRarity.types';
import { ItemType } from '@/types/customization/item/itemType.types';
import z from 'zod';

export const createItemSchema = z.object({
	isExclusive: z.boolean(),
	type: z.enum(ItemType),
	basePrice: z.coerce.number().min(0),
	rarity: z.enum(ItemRarity),
	translations: z
		.array(translationSchema)
		.min(1, { message: 'At least one translation is required' }),
	media: z.instanceof(File, { message: 'File is required' }),
	preview: z.instanceof(File, { message: 'File is required' }),
});
