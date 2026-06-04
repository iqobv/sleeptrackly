import { CreateChallengeDto, UpdateChallengeDto } from '@/dto';
import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type GetChallengesResponse =
	paths['/v1/challenges/me']['get']['responses']['200']['content']['application/json'];
type GetChallengeByIdResponse =
	paths['/v1/challenges/{id}']['get']['responses']['200']['content']['application/json'];
type CreateChallengeResponse =
	paths['/v1/challenges']['post']['responses']['201']['content']['application/json'];
type UpdateChallengeResponse =
	paths['/v1/challenges/{id}']['patch']['responses']['200']['content']['application/json'];
type DeleteChallengeResponse =
	paths['/v1/challenges/{id}']['delete']['responses']['200']['content']['application/json'];

export const getChallenges = async () =>
	(await apiClient.get<GetChallengesResponse>('/v1/challenges/me')).data;

export const getChallengeById = async (id: string) =>
	(await apiClient.get<GetChallengeByIdResponse>(`/v1/challenges/${id}`)).data;

export const createChallenge = async (data: CreateChallengeDto) =>
	(await apiClient.post<CreateChallengeResponse>('/v1/challenges', data)).data;

export const updateChallenge = async (id: string, data: UpdateChallengeDto) =>
	(await apiClient.patch<UpdateChallengeResponse>(`/v1/challenges/${id}`, data))
		.data;

export const deleteChallenge = async (id: string) =>
	(await apiClient.delete<DeleteChallengeResponse>(`/v1/challenges/${id}`))
		.data;
