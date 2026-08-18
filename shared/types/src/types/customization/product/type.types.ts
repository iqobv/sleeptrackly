import { components } from '../../../schema';

type SwaggerProductType = components['schemas']['ProductType'];

export const ProductType = {
	ITEM: 'ITEM',
	BUNDLE: 'BUNDLE',
} as const satisfies Record<SwaggerProductType, SwaggerProductType>;

export type ProductType = (typeof ProductType)[keyof typeof ProductType];
