import { UpdateChallengeDto } from '@/dto/challenge/challenge.dto';
import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type UpdateChallengeResponse =
	paths['/v1/admin/challenges/{id}']['patch']['responses']['200']['content']['application/json'];

export const updateChallenge = async (id: string, data: UpdateChallengeDto) =>
	(
		await apiClient.patch<UpdateChallengeResponse>(
			`/v1/admin/challenges/${id}`,
			data,
		)
	).data;
