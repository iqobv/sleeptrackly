import { apiClient } from '@/api/axios';
import { paths } from '@/types/schema';

type GetChallengeTemplateResponse =
	paths['/v1/challenge-templates/{id}']['get']['responses']['200']['content']['application/json'];

export const getChallengeTemplate = async (id: string) =>
	(
		await apiClient.get<GetChallengeTemplateResponse>(
			`/v1/challenge-templates/${id}`,
		)
	).data;
