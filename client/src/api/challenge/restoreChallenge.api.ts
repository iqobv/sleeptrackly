import { paths } from '@shared/types';
import { apiClient } from '../axios';

type RestoreChallengeResponse =
	paths['/v1/challenges/{id}/restore']['post']['responses']['200']['content']['application/json'];

export const restoreChallenge = async (id: string) =>
	(
		await apiClient.post<RestoreChallengeResponse>(
			`/v1/challenges/${id}/restore`,
		)
	).data;
