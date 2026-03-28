import { IUserCoin } from '@/types';
import { fetcher } from '@/utils';

export const getUserCoins = async () =>
	await fetcher<IUserCoin>(`/api/v1/coins`);
