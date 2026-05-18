import { apiClient } from '@/api/axios';
import { CreateItemDto, PaginationDto, UpdateItemDto } from '@/dto';
import { PaginatedDataResponse } from '@/types/api/paginatedData.types';
import { Item } from '@/types/customization/item/item.types';
import { getFormData } from '@/utils';

export const createItem = async (dto: CreateItemDto) => {
	const formData = getFormData(dto);

	return (
		await apiClient.post<Item>('/v1/items', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	).data;
};

export const updateItem = async (id: string, dto: UpdateItemDto) => {
	const formData = getFormData(dto);

	return (
		await apiClient.patch<Item>(`/v1/items/${id}`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	).data;
};

export const getAllItems = async (query: PaginationDto) =>
	(
		await apiClient<PaginatedDataResponse<Item>>(`/v1/items`, {
			params: query,
		})
	).data;

export const getItemById = async (id: string) =>
	(await apiClient.get<Item>(`/v1/items/id/${id}`)).data;

export const getAllAvailableItems = async (query: PaginationDto) =>
	(
		await apiClient.get<PaginatedDataResponse<Item>>(`/v1/items/available`, {
			params: query,
		})
	).data;

export const deleteItem = async (id: string) =>
	(await apiClient.delete<boolean>(`/v1/items/${id}`)).data;
