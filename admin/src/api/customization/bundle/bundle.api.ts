import { CreateBundleDto, PaginationDto, UpdateBundleDto } from '@/dto';
import { IBundle, IPaginatedDataResponse } from '@/types';
import { fetcher, getFormData, parseSearchParams } from '@/utils';

export const createBundle = async (dto: CreateBundleDto) => {
	const formData = getFormData(dto);

	return await fetcher<IBundle>('/api/v1/items/bundles', {
		method: 'POST',
		body: formData,
	});
};

export const updateBundle = async (id: string, dto: UpdateBundleDto) => {
	const formData = getFormData(dto);

	return await fetcher<IBundle>(`/api/v1/items/bundles/${id}`, {
		method: 'PATCH',
		body: formData,
	});
};

export const getAllBundles = async (query: PaginationDto) => {
	const params = parseSearchParams(query);

	return await fetcher<IPaginatedDataResponse<IBundle>>(
		`/api/v1/items/bundles?${params.toString()}`,
	);
};

export const getAllAvailableBundles = async (query: PaginationDto) => {
	const params = parseSearchParams(query);

	return await fetcher<IPaginatedDataResponse<IBundle>>(
		`/api/v1/items/bundles/available?${params.toString()}`,
	);
};

export const getBundleById = async (id: string) =>
	await fetcher<IBundle>(`/api/v1/items/bundles/id/${id}`);

export const deleteBundle = async (id: string) =>
	await fetcher<boolean>(`/api/v1/items/bundles/${id}`, {
		method: 'DELETE',
	});
