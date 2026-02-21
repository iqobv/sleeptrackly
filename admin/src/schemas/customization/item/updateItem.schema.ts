import { translationSchema } from '@/schemas/translation/translation.schema';
import z from 'zod';
import { createItemSchema } from './createItem.schema';

export const updateItemSchema = createItemSchema.partial().extend({
	translations: z.array(translationSchema.partial()),
	media: z.instanceof(File).optional().nullable(),
	preview: z.instanceof(File).optional().nullable(),
});
