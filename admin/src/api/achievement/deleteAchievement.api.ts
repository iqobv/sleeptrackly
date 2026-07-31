import { paths } from '@shared/types';
import { apiClient } from '../axios';

type DeleteAchievementResponse =
	paths['/v1/achievements/{id}']['delete']['responses']['200']['content']['application/json'];

export const deleteAchievement = async (id: string) =>
	(await apiClient.delete<DeleteAchievementResponse>(`/v1/achievements/${id}`))
		.data;
