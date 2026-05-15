import { SHOP_SORT_BY } from '@/constants';

export type ShopSortBy = (typeof SHOP_SORT_BY)[keyof typeof SHOP_SORT_BY];
