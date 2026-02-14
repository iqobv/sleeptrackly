import { CreateItemDto, PaginationDto, UpdateItemDto } from '@/dto';
import { IPaginatedDataResponse } from '@/types/api/paginatedData.types';
import { IItem } from '@/types/customization/item/item.types';
import { fetcher, getFormData, parseSearchParams } from '@/utils';

export const createItem = async (dto: CreateItemDto) => {
	const formData = getFormData(dto);

	return await fetcher<IItem>('/api/v1/items', {
		method: 'POST',
		body: formData,
	});
};

export const updateItem = async (id: string, dto: UpdateItemDto) => {
	const formData = getFormData(dto);

	return await fetcher<IItem>(`/api/v1/items/${id}`, {
		method: 'PATCH',
		body: formData,
	});
};

export const getAllItems = async (query: PaginationDto) => {
	const params = parseSearchParams(query);

	return await fetcher<IPaginatedDataResponse<IItem>>(
		`/api/v1/items?${params.toString()}`,
	);
};

export const getItemById = async (id: string) =>
	await fetcher<IItem>(`/api/v1/items/id/${id}`);

export const getAllAvailableItems = async (query: PaginationDto) => {
	const params = parseSearchParams(query);

	return await fetcher<IPaginatedDataResponse<IItem>>(
		`/api/v1/items/available?${params.toString()}`,
	);
};

export const deleteItem = async (id: string) =>
	await fetcher<boolean>(`/api/v1/items/${id}`, {
		method: 'DELETE',
	});
