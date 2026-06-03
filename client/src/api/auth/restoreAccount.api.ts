import { paths } from '@/types/schema';
import { apiClient, apiServer } from '../axios';

type RestoreAccountResponse =
	paths['/v1/auth/restore-account/restore']['post']['responses']['200']['content']['application/json'];

const endpoint = '/v1/auth/restore-account/restore';

export const restoreAccount = async (token: string) =>
	(
		await apiClient.post<RestoreAccountResponse>(
			endpoint,
			{},
			{
				params: { token },
			},
		)
	).data;

export const restoreAccountServer = async (token: string) =>
	(
		await apiServer.post<RestoreAccountResponse>(
			endpoint,
			{},
			{
				params: { token },
			},
		)
	).data;
