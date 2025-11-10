import { IUser } from '@/types';
import { fetcher } from '@/utils';

export const logout = async () =>
	await fetcher<boolean>('/api/v1/auth/logout', { method: 'POST' });

export const getUser = async () => await fetcher<IUser>('/api/v1/auth/me');
