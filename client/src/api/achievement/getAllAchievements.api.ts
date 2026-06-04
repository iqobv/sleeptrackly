import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type GetAllAchievementsResponse =
	paths['/v1/achievements/me']['get']['responses']['200']['content']['application/json'];

export const getAllAchievements = async () =>
	(await apiClient.get<GetAllAchievementsResponse>('/v1/achievements/me')).data;
