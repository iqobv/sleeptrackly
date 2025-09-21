import { SettingsAccountDto } from '@/dto';
import { IUser } from '@/types';
import { fetcher } from '@/utils';

export const updateUser = async (data: SettingsAccountDto) =>
	await fetcher<IUser>('/api/v1/users/me', {
		method: 'PATCH',
		body: JSON.stringify(data),
	});
