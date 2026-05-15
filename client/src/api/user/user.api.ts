import { SettingsAccountDto } from '@/dto';
import { User } from '@/types';
import { apiClient } from '../axios';

export const updateUser = async (data: SettingsAccountDto) =>
	(await apiClient.patch<User>('/v1/users/me', data)).data;

export const searchByUsername = async (username: string) =>
	(await apiClient.get<User[]>(`/v1/users/search`, { params: username })).data;
