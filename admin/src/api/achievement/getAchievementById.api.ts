import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type GetAchievementByIdResponse =
	paths['/v1/achievements/id/{id}']['get']['responses']['200']['content']['application/json'];

export const getAchievementById = async (id: string) =>
	(await apiClient.get<GetAchievementByIdResponse>(`/v1/achievements/id/${id}`))
		.data;
