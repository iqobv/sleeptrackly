import { LanguageDto } from '@/dto/query/pagination.dto';
import { paths } from '@shared/types';
import { apiClient } from '../axios';

type GetShopFiltersResponse =
	paths['/v1/shop/filters']['get']['responses']['200']['content']['application/json'];

export const getShopFilters = async (query: LanguageDto) =>
	(
		await apiClient.get<GetShopFiltersResponse>(`/v1/shop/filters`, {
			params: query,
		})
	).data;
