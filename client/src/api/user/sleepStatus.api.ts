import { ISleepEntry, ISleepStatus } from '@/types';
import { fetcher } from '@/utils';

interface UpdateSleepResponse {
	userSleepStatus: ISleepStatus;
	sleepEntry: ISleepEntry;
}

export const getSleepStatus = async () =>
	await fetcher<ISleepStatus>('/api/v1/sleep/me');

export const updateSleepStatus = async () => {
	const clickedBy = new Date().toISOString();

	return await fetcher<UpdateSleepResponse>('/api/v1/sleep/me', {
		method: 'PATCH',
		body: JSON.stringify({ clickedBy }),
	});
};
