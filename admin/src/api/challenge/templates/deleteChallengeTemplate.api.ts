import { apiClient } from '@/api/axios';
import { paths } from '@/types/schema';

type DeleteChallengeTemplateResponse =
	paths['/v1/challenge-templates/{id}']['delete']['responses']['200']['content']['application/json'];

export const deleteChallengeTemplate = async (id: string) =>
	(
		await apiClient.delete<DeleteChallengeTemplateResponse>(
			`/v1/challenge-templates/${id}`,
		)
	).data;
