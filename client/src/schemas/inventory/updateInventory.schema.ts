import z from 'zod';

export const updateInventoryItemSchema = z.object({
	isEquipped: z.boolean().optional(),
});
