import { translationSchema } from '@/schemas/translation/translation.schema';
import z from 'zod';
import { createItemSchema } from './createItem.schema';

export const updateItemSchema = createItemSchema.partial().extend({
	file: z.instanceof(File).optional().nullable(),
	translations: z.array(translationSchema.partial()),
});
