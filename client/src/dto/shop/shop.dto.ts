import {
	allShopFilterSchema,
	allShopFilterWithPaginationSchema,
} from '@/schemas/shop/allShopFilter.schema';
import { z } from 'zod';

export type ShopFilterDto = z.infer<typeof allShopFilterSchema>;
export type PaginatedShopFilterDto = z.infer<
	typeof allShopFilterWithPaginationSchema
>;
