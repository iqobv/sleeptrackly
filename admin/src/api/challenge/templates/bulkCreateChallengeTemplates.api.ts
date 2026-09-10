import { apiClient } from '@/api/axios';
import { BulkCreateChallengeTemplateDto } from '@/dto/challenge/challengeTemplate.dto';
import { paths } from '@shared/types';

type BulkCreateChallengeResponse =
	paths['/v1/challenge-templates/bulk']['post']['responses']['200']['content']['application/json'];

export const bulkCreateChallengeTemplates = async (
	data: BulkCreateChallengeTemplateDto,
) =>
	(
		await apiClient.post<BulkCreateChallengeResponse>(
			'/v1/challenge-templates/bulk',
			data,
		)
	).data;
