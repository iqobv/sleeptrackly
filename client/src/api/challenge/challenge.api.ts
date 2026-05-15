import { CreateChallengeDto, UpdateChallengeDto } from '@/dto';
import { Challenge, ChallengeFull } from '@/types';
import { apiClient } from '../axios';

export const getChellenges = async () =>
	(await apiClient.get<Challenge[]>('/v1/challenges/me')).data;

export const getChallengeById = async (id: string) =>
	(await apiClient.get<ChallengeFull>(`/v1/challenges/${id}`)).data;

export const createChallenge = async (data: CreateChallengeDto) =>
	(await apiClient.post<Challenge>('/v1/challenges', data)).data;

export const updateChallenge = async (id: string, data: UpdateChallengeDto) =>
	(await apiClient.patch<Challenge>(`/v1/challenges/${id}`, data)).data;

export const deleteChallenge = async (id: string) =>
	(await apiClient.delete<boolean>(`/v1/challenges/${id}`)).data;
