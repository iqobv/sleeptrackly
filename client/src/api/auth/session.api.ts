import { Session } from '@/types';
import { apiClient } from '../axios';

export const getAllSessions = async () =>
	(await apiClient.get<Session[]>(`/v1/auth/sessions/all`)).data;

export const terminateSession = async (id: string) =>
	(await apiClient.delete<boolean>(`/v1/auth/sessions/${id}`)).data;

export const terminateAllSessions = async () =>
	(await apiClient.delete<boolean>(`/v1/auth/sessions/all-other`)).data;
