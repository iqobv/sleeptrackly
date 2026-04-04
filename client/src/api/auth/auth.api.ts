import { LoginDto, RegisterDto } from '@/dto';
import { IRegisterResult, IUser } from '@/types';
import { fetcher } from '@/utils';

export const loginWithPassword = async (data: LoginDto) =>
	await fetcher<IUser>('/v1/auth/login', {
		method: 'POST',
		body: JSON.stringify(data),
	});

export const registerWithPassword = async (data: RegisterDto) => {
	const { acceptTerms: _, ...rest } = data;

	return await fetcher<IRegisterResult>('/v1/auth/register', {
		method: 'POST',
		body: JSON.stringify(rest),
	});
};

export const logout = async () =>
	await fetcher<boolean>('/v1/auth/logout', { method: 'POST' });

export const getUser = async () => await fetcher<IUser>('/v1/auth/me');

export const deleteAccount = async () =>
	await fetcher<boolean>('/v1/auth/delete', { method: 'DELETE' });
