import { ChallengeQueryDto } from '@/dto/challenge/challenge.dto';
import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type GetAllChallengesResponse =
	paths['/v1/admin/challenges']['get']['responses']['200']['content']['application/json'];

export const getAllChallenges = async (params: ChallengeQueryDto) =>
	(
		await apiClient.get<GetAllChallengesResponse>('/v1/admin/challenges', {
			params,
		})
	).data;
