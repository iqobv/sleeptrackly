import { apiClient } from '@/api/axios';
import { paths } from '@shared/types';

type GetCollectionByIdResponse =
	paths['/v1/collections/id/{id}']['get']['responses']['200']['content']['application/json'];

export const getCollectionById = async (id: string) =>
	(await apiClient.get<GetCollectionByIdResponse>(`/v1/collections/id/${id}`))
		.data;
