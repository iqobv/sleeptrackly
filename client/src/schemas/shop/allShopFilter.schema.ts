import { ItemType, ProductType, ShopSortBy } from '@/types';
import { z } from 'zod';
import { paginationWithLanguageSchema } from '../query/paginationWithLanguage.schema';

export const allShopFilterSchema = z.object({
	type: z
		.enum(['ALL', ...Object.values(ProductType)])
		.optional()
		.default('ALL'),
	itemType: z.array(z.enum(ItemType)).optional(),
	search: z.string().min(3).optional(),
	sortBy: z.enum(ShopSortBy).optional().default('DATE'),
	sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

export const allShopFilterWithPaginationSchema = allShopFilterSchema.extend(
	paginationWithLanguageSchema.shape,
);
