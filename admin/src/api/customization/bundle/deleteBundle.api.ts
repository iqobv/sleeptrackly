import { apiClient } from '@/api/axios';
import { paths } from '@/types/schema';

type DeleteBundleResponse =
	paths['/v1/bundles/{id}']['delete']['responses']['200']['content']['application/json'];

export const deleteBundle = async (id: string) =>
	(await apiClient.delete<DeleteBundleResponse>(`/v1/bundles/${id}`)).data;
