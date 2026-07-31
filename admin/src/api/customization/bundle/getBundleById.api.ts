import { apiClient } from '@/api/axios';
import { paths } from '@shared/types';

type GetBundleByIdResponse =
	paths['/v1/bundles/id/{id}']['get']['responses']['200']['content']['application/json'];

export const getBundleById = async (id: string) =>
	(await apiClient.get<GetBundleByIdResponse>(`/v1/bundles/id/${id}`)).data;
