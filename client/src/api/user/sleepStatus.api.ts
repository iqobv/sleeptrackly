import { ISleepEntry, ISleepStatus } from '@/types';
import { fetcher } from '@/utils';

interface UpdateSleepResponse {
	userSleepStatus: ISleepStatus;
	sleepEntry: ISleepEntry;
	reward: {
		rewarded: boolean;
		amount: number;
	} | null;
}

export const getSleepStatus = async () =>
	await fetcher<ISleepStatus>('/v1/sleep/me');

export const updateSleepStatus = async () => {
	const clickedBy = new Date().toISOString();

	return await fetcher<UpdateSleepResponse>('/v1/sleep/me', {
		method: 'PATCH',
		body: JSON.stringify({ clickedBy }),
	});
};
