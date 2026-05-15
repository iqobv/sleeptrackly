import { apiClient } from '@/api/axios';
import { CreateItemDto, PaginationDto, UpdateItemDto } from '@/dto';
import { IPaginatedDataResponse } from '@/types/api/paginatedData.types';
import { IItem } from '@/types/customization/item/item.types';
import { getFormData } from '@/utils';

export const createItem = async (dto: CreateItemDto) => {
	const formData = getFormData(dto);

	return (await apiClient.post<IItem>('/v1/items', formData)).data;
};

export const updateItem = async (id: string, dto: UpdateItemDto) => {
	const formData = getFormData(dto);

	return (await apiClient.patch<IItem>(`/v1/items/${id}`, formData)).data;
};

export const getAllItems = async (query: PaginationDto) =>
	(
		await apiClient<IPaginatedDataResponse<IItem>>(`/v1/items`, {
			params: query,
		})
	).data;

export const getItemById = async (id: string) =>
	(await apiClient.get<IItem>(`/v1/items/id/${id}`)).data;

export const getAllAvailableItems = async (query: PaginationDto) =>
	(
		await apiClient.get<IPaginatedDataResponse<IItem>>(`/v1/items/available`, {
			params: query,
		})
	).data;

export const deleteItem = async (id: string) =>
	(await apiClient.delete<boolean>(`/v1/items/${id}`)).data;
