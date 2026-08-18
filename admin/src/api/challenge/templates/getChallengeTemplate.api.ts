import { apiClient } from '@/api/axios';
import { paths } from '@shared/types';

type GetChallengeTemplateResponse =
	paths['/v1/challenge-templates/{id}']['get']['responses']['200']['content']['application/json'];

export const getChallengeTemplate = async (id: string) =>
	(
		await apiClient.get<GetChallengeTemplateResponse>(
			`/v1/challenge-templates/${id}`,
		)
	).data;
