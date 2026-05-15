import { SettingsAccountDto } from '@/dto';
import { IUser } from '@/types';
import { apiClient } from '../axios';

export const updateUser = async (data: SettingsAccountDto) =>
	(await apiClient.patch<IUser>('/v1/users/me', data)).data;

export const searchByUsername = async (username: string) =>
	(await apiClient.get<IUser[]>(`/v1/users/search`, { params: username })).data;
