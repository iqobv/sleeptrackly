import { LoginDto, RegisterDto } from '@/dto/auth/auth.dto';
import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type LoginResponse =
	paths['/v1/auth/login']['post']['responses']['200']['content']['application/json'];
type RegisterResponse =
	paths['/v1/auth/register']['post']['responses']['201']['content']['application/json'];
type LogoutResponse =
	paths['/v1/auth/logout']['post']['responses']['200']['content']['application/json'];
type GetUserResponse =
	paths['/v1/auth/me']['get']['responses']['200']['content']['application/json'];

type DeleteAccountResponse =
	paths['/v1/auth/delete']['delete']['responses']['200']['content']['application/json'];

export const loginWithPassword = async (data: LoginDto) =>
	(await apiClient.post<LoginResponse>('/v1/auth/login', data)).data;

export const registerWithPassword = async (data: RegisterDto) => {
	const { acceptTerms: _, ...rest } = data;

	return (await apiClient.post<RegisterResponse>('/v1/auth/register', rest))
		.data;
};

export const logout = async () =>
	(await apiClient.post<LogoutResponse>('/v1/auth/logout')).data;

export const getUser = async () =>
	(await apiClient.get<GetUserResponse>('/v1/auth/me')).data;

export const deleteAccount = async () =>
	(await apiClient.delete<DeleteAccountResponse>('/v1/auth/delete')).data;
