import { IProfile } from '@/types';
import { fetcher } from '@/utils';

export const getProfile = async (username: string) =>
	await fetcher<IProfile>(`/api/v1/profiles/${username}`, {}, false);
