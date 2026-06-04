import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type GetUserCoinsResponse =
	paths['/v1/coins']['get']['responses']['200']['content']['application/json'];

export const getUserCoins = async () =>
	(await apiClient.get<GetUserCoinsResponse>(`/v1/coins`)).data;
