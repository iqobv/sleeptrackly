import { components, ProductType } from '@shared/types';

type SwaggerProductType = components['schemas']['ProductType'];

export const FilterProductType = {
	ALL: 'ALL',
	...ProductType,
} as const satisfies Record<
	'ALL' | SwaggerProductType,
	'ALL' | SwaggerProductType
>;

export type FilterProductType =
	(typeof FilterProductType)[keyof typeof FilterProductType];
