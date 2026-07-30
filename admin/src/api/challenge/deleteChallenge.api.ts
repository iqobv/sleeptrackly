import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type DeleteChallengeResponse =
	paths['/v1/admin/challenges/{id}']['delete']['responses']['200']['content']['application/json'];

export const deleteChallenge = async (id: string) =>
	(
		await apiClient.delete<DeleteChallengeResponse>(
			`/v1/admin/challenges/${id}`,
		)
	).data;
