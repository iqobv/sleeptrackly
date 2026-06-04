import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type GetSessionsResponse =
	paths['/v1/auth/sessions/all']['get']['responses']['200']['content']['application/json'];
type TerminateSessionResponse =
	paths['/v1/auth/sessions/id/{id}']['delete']['responses']['200']['content']['application/json'];
type TerminateAllSessionsResponse =
	paths['/v1/auth/sessions/all-other']['delete']['responses']['200']['content']['application/json'];

export const getAllSessions = async () =>
	(await apiClient.get<GetSessionsResponse>(`/v1/auth/sessions/all`)).data;

export const terminateSession = async (id: string) =>
	(
		await apiClient.delete<TerminateSessionResponse>(
			`/v1/auth/sessions/id/${id}`,
		)
	).data;

export const terminateAllSessions = async () =>
	(
		await apiClient.delete<TerminateAllSessionsResponse>(
			`/v1/auth/sessions/all-other`,
		)
	).data;
