import { apiClient } from '@/api/axios';
import { UpdateChallengeTemplateDto } from '@/dto/challenge/challengeTemplate.dto';
import { paths } from '@shared/types';

type UpdateChallengeTemplateResponse =
	paths['/v1/challenge-templates/{id}']['patch']['responses']['200']['content']['application/json'];

export const updateChallengeTemplate = async (
	id: string,
	data: UpdateChallengeTemplateDto,
) =>
	(
		await apiClient.patch<UpdateChallengeTemplateResponse>(
			`/v1/challenge-templates/${id}`,
			data,
		)
	).data;
