import { UserSanctionDto } from '@/dto/userSanction/userSanction.dto';
import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type CreateSanctionResponse =
	paths['/v1/admin/user-sanctions']['post']['responses']['200']['content']['application/json'];
type RemoveSanctionResponse =
	paths['/v1/admin/user-sanctions/{id}']['delete']['responses']['200']['content']['application/json'];

export const createSanction = async (data: UserSanctionDto) =>
	(
		await apiClient.post<CreateSanctionResponse>(
			'/v1/admin/user-sanctions',
			data,
		)
	).data;

export const removeUserSanction = async (id: string) =>
	(
		await apiClient.delete<RemoveSanctionResponse>(
			`/v1/admin/user-sanctions/${id}`,
		)
	).data;
