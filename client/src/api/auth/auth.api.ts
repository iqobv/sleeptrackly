import { LoginDto, RegisterDto } from '@/dto';
import { IRegisterResult, IUser } from '@/types';
import { apiClient } from '../axios';

export const loginWithPassword = async (data: LoginDto) =>
	(await apiClient.post<IUser>('/v1/auth/login', data)).data;

export const registerWithPassword = async (data: RegisterDto) => {
	const { acceptTerms: _, ...rest } = data;

	return (await apiClient.post<IRegisterResult>('/v1/auth/register', rest))
		.data;
};

export const logout = async () =>
	(await apiClient.post<boolean>('/v1/auth/logout')).data;

export const getUser = async () =>
	(await apiClient.get<IUser>('/v1/auth/me')).data;

export const deleteAccount = async () =>
	(await apiClient.delete<boolean>('/v1/auth/delete')).data;
