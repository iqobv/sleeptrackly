import { Profile } from '@/types';
import { apiClient, apiServer } from '../axios';

export const getProfile = async (username: string) =>
	(await apiClient.get<Profile>(`/v1/profiles/${username}`)).data;

export const getServerProfile = async (username: string) =>
	(await apiServer.get<Profile>(`/v1/profiles/${username}`)).data;
