import { PaginationWithLanguageDto } from '@/dto';
import { IInventory, IPaginatedDataResponse } from '@/types';
import { fetcher } from '@/utils';

export const getInventory = async (query: PaginationWithLanguageDto) =>
	await fetcher<IPaginatedDataResponse<IInventory>>(
		`/api/v1/inventory/me?${new URLSearchParams(query as Record<string, string>)}`,
	);

export const equipInventoryItem = async (itemId: string) =>
	await fetcher<IInventory>(`/api/v1/inventory/${itemId}/equip`, {
		method: 'PATCH',
	});
