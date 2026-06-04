import { apiClient } from '@/api/axios';
import { paths } from '@/types/schema';

type GetBundleByIdResponse =
	paths['/v1/bundles/id/{id}']['get']['responses']['200']['content']['application/json'];

export const getBundleById = async (id: string) =>
	(await apiClient.get<GetBundleByIdResponse>(`/v1/bundles/id/${id}`)).data;
