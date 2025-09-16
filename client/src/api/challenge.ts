import { CreateChallengeDto, UpdateChallengeDto } from '@/dto';
import { IChallenge, IChallengeFull } from '@/types';
import { fetcher } from '@/utils';

export const getChellenges = async () =>
	await fetcher<IChallenge[]>('/api/v1/challenges/me');

export const getChallengeById = async (id: string) =>
	await fetcher<IChallengeFull>(`/api/v1/challenges/${id}`);

export const createChallenge = async (data: CreateChallengeDto) =>
	await fetcher<IChallenge>('/api/v1/challenges', {
		method: 'POST',
		body: JSON.stringify(data),
	});

export const updateChallenge = async (id: string, data: UpdateChallengeDto) =>
	await fetcher<IChallenge>(`/api/v1/challenges/${id}`, {
		method: 'PATCH',
		body: JSON.stringify(data),
	});

export const deleteChallenge = async (id: string) =>
	await fetcher<boolean>(`/api/v1/chaУllenges/${id}`, { method: 'DELETE' });
