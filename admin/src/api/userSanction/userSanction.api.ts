import { UserSanctionDto } from '@/dto';
import { IUserSanction } from '@/types';
import { fetcher } from '@/utils';

export const createSanction = async (data: UserSanctionDto) =>
	await fetcher<IUserSanction>('/api/v1/admin/user-sanctions', {
		method: 'POST',
		body: JSON.stringify(data),
	});

export const removeUserSanction = async (id: string) =>
	await fetcher<boolean>(`/api/v1/admin/user-sanctions/${id}`, {
		method: 'DELETE',
	});
