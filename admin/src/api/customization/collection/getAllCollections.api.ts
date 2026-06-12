import { apiClient } from '@/api/axios';
import { PaginationDto } from '@/dto/query/pagination.dto';
import { paths } from '@/types/schema';

type GetAllCollectionsResponse =
	paths['/v1/collections/all']['get']['responses']['200']['content']['application/json'];

export const getAllCollections = async (query: PaginationDto) =>
	(
		await apiClient.get<GetAllCollectionsResponse>('/v1/collections/all', {
			params: query,
		})
	).data;
