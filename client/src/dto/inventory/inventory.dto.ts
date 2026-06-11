import { updateInventoryItemSchema } from '@/schemas/inventory/updateInventory.schema';
import z from 'zod';

export type updateInventoryItemDto = z.infer<typeof updateInventoryItemSchema>;
