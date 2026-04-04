import { SettingsAccountDto } from '@/dto';
import { IUser } from '@/types';
import { fetcher } from '@/utils';

export const updateUser = async (data: SettingsAccountDto) =>
	await fetcher<IUser>('/v1/users/me', {
		method: 'PATCH',
		body: JSON.stringify(data),
	});

export const searchByUsername = async (username: string) =>
	await fetcher<IUser[]>(`/v1/users/search?username=${username}`);
