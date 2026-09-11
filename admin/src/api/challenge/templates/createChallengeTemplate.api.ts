import { apiClient } from '@/api/axios';
import { CreateChallengeTemplateDto } from '@/dto/challenge/challengeTemplate.dto';
import { paths } from '@shared/types';

type CreateChallengeTemplateApiResponse =
	paths['/v1/challenge-templates']['post']['responses']['200']['content']['application/json'];

export const createChallengeTemplate = async (
	data: CreateChallengeTemplateDto,
) =>
	(
		await apiClient.post<CreateChallengeTemplateApiResponse>(
			'/v1/challenge-templates',
			data,
		)
	).data;
