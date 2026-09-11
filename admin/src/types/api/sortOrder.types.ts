import { components } from '@shared/types';

type SwaggerSortOrder = components['schemas']['SortOrder'];

export const SortOrder = {
	asc: 'asc',
	desc: 'desc',
} as const satisfies Record<SwaggerSortOrder, SwaggerSortOrder>;

export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
