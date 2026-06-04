import { apiClient } from '@/api/axios';
import { paths } from '@/types/schema';

type GetAllCollectionsResponse =
	paths['/v1/collections/all']['get']['responses']['200']['content']['application/json'];

export const getAllCollections = async () =>
	(await apiClient.get<GetAllCollectionsResponse>('/v1/collections/all')).data;
