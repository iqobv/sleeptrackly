import { paths } from '@shared/types';
import { apiClient } from '../axios';

type GetChallengeByIdResponse =
	paths['/v1/admin/challenges/{id}']['get']['responses']['200']['content']['application/json'];

export const getChallengeById = async (id: string) =>
	(await apiClient.get<GetChallengeByIdResponse>(`/v1/admin/challenges/${id}`))
		.data;
