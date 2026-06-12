import { createItemSchema } from '@/schemas/customization/item/createItem.schema';
import { updateItemSchema } from '@/schemas/customization/item/updateItem.schema';
import z from 'zod';

export type CreateItemDto = z.infer<typeof createItemSchema>;
export type UpdateItemDto = z.infer<typeof updateItemSchema>;
