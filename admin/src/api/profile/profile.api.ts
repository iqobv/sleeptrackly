import { paths } from '@shared/types';
import { apiClient } from '../axios';

type GetProfileResponse =
	paths['/v1/profiles/{username}']['get']['responses']['200']['content']['application/json'];

export const getProfile = async (username: string) =>
	(await apiClient.get<GetProfileResponse>(`/v1/profiles/${username}`)).data;
