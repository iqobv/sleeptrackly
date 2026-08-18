import { apiClient } from '@/api/axios';
import { paths } from '@shared/types';

type DeleteCollectionResponse =
	paths['/v1/collections/{id}']['delete']['responses']['200']['content']['application/json'];

export const deleteCollection = async (id: string) =>
	(await apiClient.delete<DeleteCollectionResponse>(`/v1/collections/${id}`))
		.data;
