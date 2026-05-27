import { apiClient } from '../axios';

export const deleteAchievement = async (id: string) =>
	(await apiClient.delete<{ message: string }>(`/v1/achievements/${id}`)).data;
