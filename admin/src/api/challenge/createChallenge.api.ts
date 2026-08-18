import { CreateChallengeDto } from '@/dto/challenge/challenge.dto';
import { paths } from '@shared/types';
import { apiClient } from '../axios';

type CreateChallengeResponse =
	paths['/v1/admin/challenges']['post']['responses']['200']['content']['application/json'];

export const createChallenge = async (data: CreateChallengeDto) =>
	(await apiClient.post<CreateChallengeResponse>('/v1/admin/challenges', data))
		.data;
