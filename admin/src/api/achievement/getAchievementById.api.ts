import { FullAchievement } from '@/types';
import { apiClient } from '../axios';

export const getAllAchievementById = async (id: string) =>
	(await apiClient.get<FullAchievement>(`/v1/achievements/id/${id}`)).data;
