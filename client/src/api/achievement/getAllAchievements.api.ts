import { Achievement } from '@/types';
import { apiClient } from '../axios';

export const getAllAchievements = async () =>
	(await apiClient.get<Achievement[]>('/v1/achievements/me')).data;
