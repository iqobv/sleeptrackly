import { apiClient } from '@/api/axios';

export const deleteCollection = async (id: string) =>
	(await apiClient.delete<{ message: string }>(`/v1/collections/${id}`)).data;
