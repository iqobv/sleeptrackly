import { FullAchievement } from '@/types';
import { apiClient } from '../axios';

export const getAchievementById = async (id: string) =>
	(await apiClient.get<FullAchievement>(`/v1/achievements/id/${id}`)).data;
