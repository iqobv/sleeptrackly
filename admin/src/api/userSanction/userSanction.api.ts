import { UserSanctionDto } from '@/dto';
import { UserSanction } from '@/types';
import { apiClient } from '../axios';

export const createSanction = async (data: UserSanctionDto) =>
	(await apiClient.post<UserSanction>('/v1/admin/user-sanctions', data)).data;

export const removeUserSanction = async (id: string) =>
	(await apiClient.delete<boolean>(`/v1/admin/user-sanctions/${id}`)).data;
