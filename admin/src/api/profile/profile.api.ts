import { IProfile } from '@/types';
import { apiClient } from '../axios';

export const getProfile = async (username: string) =>
	(await apiClient.get<IProfile>(`/v1/profiles/${username}`)).data;
