import { UserSleepStatusDto } from '@/dto/user/userSleepStatus.dto';
import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type GetSleepStatusResponse =
	paths['/v1/sleep/me']['get']['responses']['200']['content']['application/json'];
type UpdateSleepStatusResponse =
	paths['/v1/sleep/me']['patch']['responses']['200']['content']['application/json'];

export const getSleepStatus = async () =>
	(await apiClient.get<GetSleepStatusResponse>('/v1/sleep/me')).data;

export const updateSleepStatus = async (dto: UserSleepStatusDto) =>
	(await apiClient.patch<UpdateSleepStatusResponse>('/v1/sleep/me', dto)).data;
