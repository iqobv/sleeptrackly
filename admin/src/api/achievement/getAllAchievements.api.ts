import { paths } from '@shared/types';
import { apiClient } from '../axios';

type GetAllAchievementsResponse =
	paths['/v1/achievements/all']['get']['responses']['200']['content']['application/json'];

export const getAllAchievements = async () =>
	(await apiClient.get<GetAllAchievementsResponse>('/v1/achievements/all'))
		.data;
