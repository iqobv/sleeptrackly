import { MessageApiResponse } from '@/types';
import { apiClient, apiServer } from '../axios';

const endpoint = '/v1/auth/restore-account/restore';

export const restoreAccount = async (token: string) =>
	(
		await apiClient.post<MessageApiResponse>(
			endpoint,
			{},
			{
				params: { token },
			},
		)
	).data;

export const restoreAccountServer = async (token: string) =>
	(
		await apiServer.post<MessageApiResponse>(
			endpoint,
			{},
			{
				params: { token },
			},
		)
	).data;
