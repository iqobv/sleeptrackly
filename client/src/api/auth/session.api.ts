import { ISession } from '@/types';
import { fetcher } from '@/utils';

export const getAllSessions = async () =>
	await fetcher<ISession[]>(`/api/v1/auth/sessions/all`);

export const terminateSession = async (id: string) =>
	await fetcher<boolean>(`/api/v1/auth/sessions/session/${id}`, {
		method: 'DELETE',
	});

export const terminateAllSessions = async (excludeId: string) =>
	await fetcher<boolean>(`/api/v1/auth/sessions/except/${excludeId}`, {
		method: 'DELETE',
	});
