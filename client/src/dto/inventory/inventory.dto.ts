import { updateInventoryItemSchema } from '@/schemas';
import z from 'zod';

export type updateInventoryItemDto = z.infer<typeof updateInventoryItemSchema>;
