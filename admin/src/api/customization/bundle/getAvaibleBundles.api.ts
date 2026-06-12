import { apiClient } from '@/api/axios';
import { PaginationDto } from '@/dto/query/pagination.dto';
import { paths } from '@/types/schema';

type GetAllAvailableBundlesResponse =
	paths['/v1/bundles/available']['get']['responses']['200']['content']['application/json'];

export const getAllAvailableBundles = async (query: PaginationDto) =>
	(
		await apiClient.get<GetAllAvailableBundlesResponse>(
			`/v1/bundles/available`,
			{
				params: query,
			},
		)
	).data;
