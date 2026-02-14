import {
	allShopFilterSchema,
	allShopFilterWithPaginationSchema,
} from '@/schemas';
import z from 'zod';

export type ShopFilterDto = z.infer<typeof allShopFilterSchema>;
export type PaginatedShopFilterDto = z.infer<
	typeof allShopFilterWithPaginationSchema
>;
