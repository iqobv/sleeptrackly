import { paths } from '@shared/types';
import { apiClient, apiServer } from '../axios';

type GetAvailableChallengesResponse =
	paths['/v1/challenges/available']['get']['responses']['200']['content']['application/json'];

export const getAvailableChallenges = async () =>
	(
		await apiClient.get<GetAvailableChallengesResponse>(
			'/v1/challenges/available',
		)
	).data;

export const getServerAvailableChallenges = async () =>
	(
		await apiServer.get<GetAvailableChallengesResponse>(
			'/v1/challenges/available',
		)
	).data;
