import { apiClient } from '@/api/axios';
import { CreateBundleDto, PaginationDto, UpdateBundleDto } from '@/dto';
import { Bundle, PaginatedDataResponse } from '@/types';
import { getFormData } from '@/utils';

export const createBundle = async (dto: CreateBundleDto) => {
	const formData = getFormData(dto);

	return (
		await apiClient.post<Bundle>('/v1/bundles', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	).data;
};

export const updateBundle = async (id: string, dto: UpdateBundleDto) => {
	const formData = getFormData(dto);

	return (
		await apiClient.patch<Bundle>(`/v1/bundles/${id}`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	).data;
};

export const getAllBundles = async (query: PaginationDto) =>
	(
		await apiClient.get<PaginatedDataResponse<Bundle>>(`/v1/bundles`, {
			params: query,
		})
	).data;

export const getAllAvailableBundles = async (query: PaginationDto) =>
	(
		await apiClient.get<PaginatedDataResponse<Bundle>>(
			`/v1/bundles/available`,
			{
				params: query,
			},
		)
	).data;

export const getBundleById = async (id: string) =>
	(await apiClient.get<Bundle>(`/v1/bundles/id/${id}`)).data;

export const deleteBundle = async (id: string) =>
	(await apiClient.delete<boolean>(`/v1/bundles/${id}`)).data;
