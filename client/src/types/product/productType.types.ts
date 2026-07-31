import { components } from '@shared/types';

type SwaggerProductType = components['schemas']['ProductType'];

export const ProductType = {
	ITEM: 'ITEM',
	BUNDLE: 'BUNDLE',
} as const satisfies Record<SwaggerProductType, SwaggerProductType>;

export const FilterProductType = {
	ALL: 'ALL',
	...ProductType,
} as const satisfies Record<
	'ALL' | SwaggerProductType,
	'ALL' | SwaggerProductType
>;

export type ProductType = (typeof ProductType)[keyof typeof ProductType];
export type FilterProductType =
	(typeof FilterProductType)[keyof typeof FilterProductType];
