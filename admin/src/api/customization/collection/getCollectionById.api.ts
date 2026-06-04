import { apiClient } from '@/api/axios';
import { paths } from '@/types/schema';

type GetCollectionByIdResponse =
	paths['/v1/collections/id/{id}']['get']['responses']['200']['content']['application/json'];

export const getCollectionById = async (id: string) =>
	(await apiClient.get<GetCollectionByIdResponse>(`/v1/collections/id/${id}`))
		.data;
