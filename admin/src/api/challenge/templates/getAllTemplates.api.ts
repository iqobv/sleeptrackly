import { apiClient } from '@/api/axios';
import { ChallengeTemplatesQueryDto } from '@/dto/challenge/challengeTemplate.dto';
import { paths } from '@/types/schema';

type GetAllTemplatesApiResponse =
	paths['/v1/challenge-templates']['get']['responses']['200']['content']['application/json'];

export const getAllChallengeTemplates = async (
	params: ChallengeTemplatesQueryDto,
) =>
	(
		await apiClient.get<GetAllTemplatesApiResponse>('/v1/challenge-templates', {
			params,
		})
	).data;
