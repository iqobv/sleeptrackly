import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type RegenerateChallengeResponse =
	paths['/v1/admin/challenges/{id}/regenerate']['post']['responses']['200']['content']['application/json'];

export const regenerateChallenge = async (id: string) =>
	(
		await apiClient.post<RegenerateChallengeResponse>(
			`/v1/admin/challenges/${id}/regenerate`,
		)
	).data;
