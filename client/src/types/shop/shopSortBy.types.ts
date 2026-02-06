import { SHOP_SORT_BY } from '@/constants';

export type TShopSortBy = (typeof SHOP_SORT_BY)[keyof typeof SHOP_SORT_BY];
