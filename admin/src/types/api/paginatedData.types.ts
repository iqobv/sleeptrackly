import { components } from '@shared/types';

export type PaginatedMetaData = components['schemas']['PaginatedMetaDto'];

export interface PaginatedDataResponse<T> {
	items: T[];
	meta: PaginatedMetaData;
}
