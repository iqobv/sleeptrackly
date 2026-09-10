import { paths } from '@shared/types';
import { apiClient } from '../axios';

type GenerateWeeklyChallengesResponse =
	paths['/v1/admin/challenges/generate']['post']['responses']['200']['content']['application/json'];

export const generateWeeklyChallenges = async () =>
	(
		await apiClient.post<GenerateWeeklyChallengesResponse>(
			'/v1/admin/challenges/generate',
		)
	).data;
