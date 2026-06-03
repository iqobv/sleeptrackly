import { paths } from '@/types/schema';
import { apiClient, apiServer } from '../axios';

type GetProfileResponse =
	paths['/v1/profiles/{username}']['get']['responses']['200']['content']['application/json'];

export const getProfile = async (username: string) =>
	(await apiClient.get<GetProfileResponse>(`/v1/profiles/${username}`)).data;

export const getServerProfile = async (username: string) =>
	(await apiServer.get<GetProfileResponse>(`/v1/profiles/${username}`)).data;
