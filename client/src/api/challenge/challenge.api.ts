import { CreateChallengeDto, UpdateChallengeDto } from '@/dto';
import { IChallenge, IChallengeFull } from '@/types';
import { apiClient } from '../axios';

export const getChellenges = async () =>
	(await apiClient.get<IChallenge[]>('/v1/challenges/me')).data;

export const getChallengeById = async (id: string) =>
	(await apiClient.get<IChallengeFull>(`/v1/challenges/${id}`)).data;

export const createChallenge = async (data: CreateChallengeDto) =>
	(await apiClient.post<IChallenge>('/v1/challenges', data)).data;

export const updateChallenge = async (id: string, data: UpdateChallengeDto) =>
	(await apiClient.patch<IChallenge>(`/v1/challenges/${id}`, data)).data;

export const deleteChallenge = async (id: string) =>
	(await apiClient.delete<boolean>(`/v1/challenges/${id}`)).data;
