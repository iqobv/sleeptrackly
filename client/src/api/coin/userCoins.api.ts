import { IUserCoin } from '@/types';
import { apiClient } from '../axios';

export const getUserCoins = async () =>
	(await apiClient.get<IUserCoin>(`/v1/coins`)).data;
