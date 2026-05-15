import { Profile } from '@/types';
import { apiClient } from '../axios';

export const getProfile = async (username: string) =>
	(await apiClient.get<Profile>(`/v1/profiles/${username}`)).data;
