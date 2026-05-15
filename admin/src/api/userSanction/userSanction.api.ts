import { UserSanctionDto } from '@/dto';
import { IUserSanction } from '@/types';
import { apiClient } from '../axios';

export const createSanction = async (data: UserSanctionDto) =>
	(await apiClient.post<IUserSanction>('/v1/admin/user-sanctions', data)).data;

export const removeUserSanction = async (id: string) =>
	(await apiClient.post<boolean>(`/v1/admin/user-sanctions/${id}`)).data;
