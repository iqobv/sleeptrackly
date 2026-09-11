import { SettingsAccountDto } from '@/dto/settings/settings.dto';
import { paths } from '@shared/types';
import { apiClient } from '../axios';

type UpdateUserResponse =
	paths['/v1/users/me']['patch']['responses']['200']['content']['application/json'];
type SearchByUsernameResponse =
	paths['/v1/users/search']['get']['responses']['200']['content']['application/json'];

export const updateUser = async (data: SettingsAccountDto) =>
	(await apiClient.patch<UpdateUserResponse>('/v1/users/me', data)).data;

export const searchByUsername = async (username: string) =>
	(
		await apiClient.get<SearchByUsernameResponse>(`/v1/users/search`, {
			params: { username },
		})
	).data;
