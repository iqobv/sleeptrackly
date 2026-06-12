import { apiClient } from '@/api/axios';
import { CreateItemDto, UpdateItemDto } from '@/dto/customization/item.dto';
import { PaginationDto } from '@/dto/query/pagination.dto';
import { paths } from '@/types/schema';
import { getFormData } from '@/utils/getFormData.util';

type CreateItemResponse =
	paths['/v1/items']['post']['responses']['201']['content']['application/json'];
type UpdateItemResponse =
	paths['/v1/items/{id}']['patch']['responses']['200']['content']['application/json'];
type GetAllItemsResponse =
	paths['/v1/items']['get']['responses']['200']['content']['application/json'];
type GetItemByIdResponse =
	paths['/v1/items/id/{id}']['get']['responses']['200']['content']['application/json'];
type GetAllAvailableItemsResponse =
	paths['/v1/items/available']['get']['responses']['200']['content']['application/json'];
type DeleteItemResponse =
	paths['/v1/items/{id}']['delete']['responses']['200']['content']['application/json'];

export const createItem = async (dto: CreateItemDto) => {
	const formData = getFormData(dto);

	return (
		await apiClient.post<CreateItemResponse>('/v1/items', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	).data;
};

export const updateItem = async (id: string, dto: UpdateItemDto) => {
	const formData = getFormData(dto);

	return (
		await apiClient.patch<UpdateItemResponse>(`/v1/items/${id}`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	).data;
};

export const getAllItems = async (query: PaginationDto) =>
	(
		await apiClient<GetAllItemsResponse>(`/v1/items`, {
			params: query,
		})
	).data;

export const getItemById = async (id: string) =>
	(await apiClient.get<GetItemByIdResponse>(`/v1/items/id/${id}`)).data;

export const getAllAvailableItems = async (query: PaginationDto) =>
	(
		await apiClient.get<GetAllAvailableItemsResponse>(`/v1/items/available`, {
			params: query,
		})
	).data;

export const deleteItem = async (id: string) =>
	(await apiClient.delete<DeleteItemResponse>(`/v1/items/${id}`)).data;
