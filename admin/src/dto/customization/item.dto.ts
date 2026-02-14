import { createItemSchema, updateItemSchema } from '@/schemas';
import z from 'zod';

export type CreateItemDto = z.infer<typeof createItemSchema>;
export type UpdateItemDto = z.infer<typeof updateItemSchema>;
