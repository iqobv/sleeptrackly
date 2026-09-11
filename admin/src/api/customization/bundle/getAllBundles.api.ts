import { apiClient } from '@/api/axios';
import { PaginationDto } from '@/dto/query/pagination.dto';
import { paths } from '@shared/types';

type GetAllBundlesResponse =
	paths['/v1/bundles']['get']['responses']['200']['content']['application/json'];

export const getAllBundles = async (query: PaginationDto) =>
	(
		await apiClient.get<GetAllBundlesResponse>(`/v1/bundles`, {
			params: query,
		})
	).data;
