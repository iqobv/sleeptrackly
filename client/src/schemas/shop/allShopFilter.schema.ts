import { FilterProductType, ItemType, ShopSortBy, SortOrder } from '@/types';
import { z } from 'zod';
import { paginationWithLanguageSchema } from '../query/paginationWithLanguage.schema';

export const allShopFilterSchema = z.object({
	type: z.enum(FilterProductType).optional().default('ALL'),
	itemType: z.array(z.enum(ItemType)).optional(),
	search: z.string().min(3).optional(),
	sortBy: z.enum(ShopSortBy).optional().default('DATE'),
	sortOrder: z.enum(SortOrder).optional().default('DESC'),
});

export const allShopFilterWithPaginationSchema = allShopFilterSchema.extend(
	paginationWithLanguageSchema.shape,
);
