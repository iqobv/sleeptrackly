export const ShopSortBy = {
	DATE: 'DATE',
	PRICE: 'PRICE',
} as const;

export type ShopSortBy = (typeof ShopSortBy)[keyof typeof ShopSortBy];
