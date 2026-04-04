import { IProfile } from '@/types';
import { fetcher } from '@/utils';

export const getProfile = async (username: string) =>
	await fetcher<IProfile>(`/v1/profiles/${username}`);
