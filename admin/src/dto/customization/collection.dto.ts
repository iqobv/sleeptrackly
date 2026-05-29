import {
	baseCollectionSchema,
	createCollectionSchema,
	updateCollectionSchema,
} from '@/schemas';
import z from 'zod';

export type CreateCollectionDto = z.infer<typeof createCollectionSchema>;
export type UpdateCollectionDto = z.infer<typeof updateCollectionSchema>;
export type BaseCollectionDto = z.infer<typeof baseCollectionSchema>;
