import { baseCollectionSchema } from '@/schemas/customization/collection/baseCollection.schema';
import { createCollectionSchema } from '@/schemas/customization/collection/createCollection.schema';
import { updateCollectionSchema } from '@/schemas/customization/collection/updateCollection.schema';
import z from 'zod';

export type CreateCollectionDto = z.infer<typeof createCollectionSchema>;
export type UpdateCollectionDto = z.infer<typeof updateCollectionSchema>;
export type BaseCollectionDto = z.infer<typeof baseCollectionSchema>;
