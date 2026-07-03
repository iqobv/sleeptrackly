import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type DeleteSleepEntryResponse =
	paths['/v1/sleep-entries/{id}']['delete']['responses']['200']['content']['application/json'];

export const deleteSleepEntry = async (id: string) =>
	(await apiClient.delete<DeleteSleepEntryResponse>(`/v1/sleep-entries/${id}`))
		.data;
