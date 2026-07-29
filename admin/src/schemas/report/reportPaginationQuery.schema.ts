import { SortOrder } from '@/types/api/sortOrder.types';
import { z } from 'zod';
import { reportStatusSchema } from './reportStatus.schema';
import { reportTypeSchema } from './reportType.schema';

export const reportPaginationQuerySchema = z.object({
	page: z.coerce.number().min(1).default(1),
	limit: z.coerce.number().int().min(1).max(100),
	sortOrder: z.enum(SortOrder).optional(),
	sortBy: z.enum(['createdAt', 'updatedAt']).optional(),
	status: reportStatusSchema.optional(),
	reportType: reportTypeSchema.optional(),
});
