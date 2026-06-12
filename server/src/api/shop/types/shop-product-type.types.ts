import { ProductType } from '@generated/prisma/enums';

export const ShopProductType = {
	ALL: 'ALL',
	...ProductType,
} as const;

export type ShopProductType =
	(typeof ShopProductType)[keyof typeof ShopProductType];
