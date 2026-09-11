import { SortOrder } from '@/types/api/sortOrder.types';
import z from 'zod';

export const sortOrder = z.enum(SortOrder);

export const sortOrderSchema = z.object({
	sortOrder: sortOrder.optional(),
});
