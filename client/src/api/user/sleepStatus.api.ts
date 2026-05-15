import { ISleepEntry, ISleepStatus } from '@/types';
import { apiClient } from '../axios';

interface UpdateSleepResponse {
	userSleepStatus: ISleepStatus;
	sleepEntry: ISleepEntry;
	reward: {
		rewarded: boolean;
		amount: number;
	} | null;
}

export const getSleepStatus = async () =>
	(await apiClient.get<ISleepStatus>('/v1/sleep/me')).data;

export const updateSleepStatus = async () => {
	const clickedBy = new Date().toISOString();

	return (
		await apiClient.patch<UpdateSleepResponse>('/v1/sleep/me', { clickedBy })
	).data;
};
