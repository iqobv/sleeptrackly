import { ITEM_TYPES, PRODUCT_TYPES, SHOP_SORT_BY } from '@/constants';
import { z } from 'zod';
import { paginationWithLanguageSchema } from '../query/paginationWithLanguage.schema';

export const allShopFilterSchema = z.object({
	type: z
		.enum(['ALL', ...Object.values(PRODUCT_TYPES)])
		.optional()
		.default('ALL'),
	itemType: z.array(z.enum(ITEM_TYPES)).optional(),
	search: z.string().min(3).optional(),
	sortBy: z.enum(SHOP_SORT_BY).optional().default('DATE'),
	sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

export const allShopFilterWithPaginationSchema = allShopFilterSchema.extend(
	paginationWithLanguageSchema.shape,
);
