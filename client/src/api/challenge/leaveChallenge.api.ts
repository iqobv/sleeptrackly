import { paths } from '@shared/types';
import { apiClient } from '../axios';

type LeaveChallengeResponse =
	paths['/v1/challenges/{id}/participate']['delete']['responses']['200']['content']['application/json'];

export const leaveChallenge = async (challengeId: string) =>
	(
		await apiClient.delete<LeaveChallengeResponse>(
			`/v1/challenges/${challengeId}/participate`,
		)
	).data;
