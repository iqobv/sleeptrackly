import { apiClient } from '@/api/axios';
import { FullCollection } from '@/types';

export const getCollectionById = async (id: string) =>
	(await apiClient.get<FullCollection>(`/v1/collections/id/${id}`)).data;
