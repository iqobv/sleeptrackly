import { LoginDto, RegisterDto } from '@/dto';
import { IUser } from '@/types';
import { fetcher } from '@/utils';

export const loginWithPassword = async (data: LoginDto) =>
	await fetcher<IUser>('/api/v1/auth/login', {
		method: 'POST',
		body: JSON.stringify(data),
	});

export const registerWithPassword = async (data: RegisterDto) =>
	await fetcher<IUser>('/api/v1/auth/register', {
		method: 'POST',
		body: JSON.stringify(data),
	});

export const logout = async () =>
	await fetcher<Boolean>('/api/v1/auth/logout', { method: 'POST' });

export const getUser = async () => await fetcher<IUser>('/api/v1/auth/me');
