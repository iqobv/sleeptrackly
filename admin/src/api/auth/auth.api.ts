import { IUser } from '@/types';
import { apiClient } from '../axios';

export const logout = async () =>
	(await apiClient.post<boolean>('/v1/auth/logout')).data;

export const getUser = async () =>
	(await apiClient.get<IUser>('/v1/auth/me')).data;
