import { FullAchievement } from '@/types';
import { apiClient } from '../axios';

export const getAllAchievements = async () =>
	(await apiClient.get<FullAchievement[]>('/v1/achievements/all')).data;
