import z from 'zod';

export const tablePaginationSchema = z
	.object({
		page: z.coerce.number().int().min(0).optional().default(0),
		limit: z.coerce.number().int().min(1).max(100).optional().default(10),
	})
	.transform((data) => ({
		page: data.page + 1,
		limit: data.limit,
	}));
