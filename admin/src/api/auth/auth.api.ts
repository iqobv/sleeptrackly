import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type LogoutResponse =
	paths['/v1/auth/logout']['post']['responses']['200']['content']['application/json'];
type GetUserResponse =
	paths['/v1/auth/me']['get']['responses']['200']['content']['application/json'];

export const logout = async () =>
	(await apiClient.post<LogoutResponse>('/v1/auth/logout')).data;

export const getUser = async () =>
	(await apiClient.get<GetUserResponse>('/v1/auth/me')).data;
