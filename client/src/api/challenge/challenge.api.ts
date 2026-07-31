import { paths } from '@shared/types';
import { apiClient } from '../axios';

type GetChallengesResponse =
	paths['/v1/challenges']['get']['responses']['200']['content']['application/json'];
type GetChallengeByIdResponse =
	paths['/v1/challenges/{id}']['get']['responses']['200']['content']['application/json'];

export const getChallenges = async () =>
	(await apiClient.get<GetChallengesResponse>('/v1/challenges/me')).data;

export const getChallengeById = async (id: string) =>
	(await apiClient.get<GetChallengeByIdResponse>(`/v1/challenges/${id}`)).data;
