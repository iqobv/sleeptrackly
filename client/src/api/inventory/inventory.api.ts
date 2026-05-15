import { PaginationWithLanguageDto } from '@/dto';
import { Inventory, PaginatedDataResponse } from '@/types';
import { apiClient } from '../axios';

export const getInventory = async (query: PaginationWithLanguageDto) =>
	(
		await apiClient.get<PaginatedDataResponse<Inventory>>(`/v1/inventory/me`, {
			params: query,
		})
	).data;

export const equipInventoryItem = async (itemId: string) =>
	(await apiClient.patch<Inventory>(`/v1/inventory/${itemId}/equip`)).data;
