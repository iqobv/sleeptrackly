import { paths } from '@shared/types';
import { apiClient, apiServer } from '../axios';

type GetChallengeByIdResponse =
	paths['/v1/challenges/{id}']['get']['responses']['200']['content']['application/json'];

export const getChallengeById = async (id: string) =>
	(await apiClient.get<GetChallengeByIdResponse>(`/v1/challenges/${id}`)).data;

export const getServerChallengeById = async (id: string) =>
	(await apiServer.get<GetChallengeByIdResponse>(`/v1/challenges/${id}`)).data;
