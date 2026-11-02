import { paths } from '@shared/types';
import { apiClient } from '../axios';

type RestoreStreakResponse =
	paths['/v1/streaks/restore']['post']['responses']['200']['content']['application/json'];

export const restoreStreak = async () =>
	(await apiClient.post<RestoreStreakResponse>('/v1/streaks/restore')).data;
