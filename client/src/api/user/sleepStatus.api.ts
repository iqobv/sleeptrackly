import { UserSleepStatusDto } from '@/dto';
import { SleepEntry, SleepStatus } from '@/types';
import { apiClient } from '../axios';

interface UpdateSleepResponse {
	userSleepStatus: SleepStatus;
	sleepEntry: SleepEntry;
	reward: {
		rewarded: boolean;
		amount: number;
	} | null;
}

export const getSleepStatus = async () =>
	(await apiClient.get<SleepStatus>('/v1/sleep/me')).data;

export const updateSleepStatus = async (dto: UserSleepStatusDto) =>
	(await apiClient.patch<UpdateSleepResponse>('/v1/sleep/me', dto)).data;
