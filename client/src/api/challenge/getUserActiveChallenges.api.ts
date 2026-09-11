import { paths } from '@shared/types';
import { apiClient } from '../axios';

type GetChallengesResponse =
	paths['/v1/challenges']['get']['responses']['200']['content']['application/json'];

export const getUserActiveChallenges = async () =>
	(await apiClient.get<GetChallengesResponse>('/v1/challenges')).data;
