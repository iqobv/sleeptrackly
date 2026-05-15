import { LoginDto, RegisterDto } from '@/dto';
import { RegisterResult, User } from '@/types';
import { apiClient } from '../axios';

export const loginWithPassword = async (data: LoginDto) =>
	(await apiClient.post<User>('/v1/auth/login', data)).data;

export const registerWithPassword = async (data: RegisterDto) => {
	const { acceptTerms: _, ...rest } = data;

	return (await apiClient.post<RegisterResult>('/v1/auth/register', rest)).data;
};

export const logout = async () =>
	(await apiClient.post<boolean>('/v1/auth/logout')).data;

export const getUser = async () =>
	(await apiClient.get<User>('/v1/auth/me')).data;

export const deleteAccount = async () =>
	(await apiClient.delete<boolean>('/v1/auth/delete')).data;
