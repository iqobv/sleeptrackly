import { PaginationWithLanguageDto } from '@/dto';
import { IInventory, IPaginatedDataResponse } from '@/types';
import { apiClient } from '../axios';

export const getInventory = async (query: PaginationWithLanguageDto) =>
	(
		await apiClient.get<IPaginatedDataResponse<IInventory>>(
			`/v1/inventory/me`,
			{
				params: query,
			},
		)
	).data;

export const equipInventoryItem = async (itemId: string) =>
	(await apiClient.patch<IInventory>(`/v1/inventory/${itemId}/equip`)).data;
