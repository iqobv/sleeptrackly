import { paths } from '@shared/types';
import { apiClient } from '../axios';

type AcceptChallengeResponse =
	paths['/v1/challenges/{id}/participate']['post']['responses']['200']['content']['application/json'];

export const acceptChallenge = async (challengeId: string) =>
	(
		await apiClient.post<AcceptChallengeResponse>(
			`/v1/challenges/${challengeId}/participate`,
		)
	).data;
