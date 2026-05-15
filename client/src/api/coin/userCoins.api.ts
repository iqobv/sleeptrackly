import { UserCoin } from '@/types';
import { apiClient } from '../axios';

export const getUserCoins = async () =>
	(await apiClient.get<UserCoin>(`/v1/coins`)).data;
