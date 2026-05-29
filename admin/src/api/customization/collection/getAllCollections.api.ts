import { apiClient } from '@/api/axios';
import { FullCollection } from '@/types';

export const getAllCollections = async () =>
	(await apiClient.get<FullCollection[]>('/v1/collections/all')).data;
