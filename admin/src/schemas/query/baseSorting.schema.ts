import z from 'zod';

export const createBaseQuerySortingSchema = <
	TBy extends Record<string, string>,
	TOrder extends Record<string, string>,
>(
	sortByObj: TBy,
	sortOrderObj: TOrder,
) =>
	z.object({
		sortOrder: z.enum(sortOrderObj).nullish(),
		sortBy: z.enum(sortByObj).nullish(),
	});
