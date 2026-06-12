import { PaginationWithLanguageDto } from '@/dto/query/pagination.dto';
import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type GetInventoryResponse =
	paths['/v1/inventory/me']['get']['responses']['200']['content']['application/json'];
type EquipInventoryItemResponse =
	paths['/v1/inventory/{id}/equip']['patch']['responses']['200']['content']['application/json'];

export const getInventory = async (query: PaginationWithLanguageDto) =>
	(
		await apiClient.get<GetInventoryResponse>(`/v1/inventory/me`, {
			params: query,
		})
	).data;

export const equipInventoryItem = async (itemId: string) =>
	(
		await apiClient.patch<EquipInventoryItemResponse>(
			`/v1/inventory/${itemId}/equip`,
		)
	).data;
