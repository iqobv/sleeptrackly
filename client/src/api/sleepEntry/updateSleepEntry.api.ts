import { UpdateSleepEntryDto } from '@/dto/sleepEntry/sleepEntry.dto';
import { paths } from '@shared/types';
import { apiClient } from '../axios';

type UpdateSleepEntryResponse =
	paths['/v1/sleep-entries/{id}']['patch']['responses']['200']['content']['application/json'];

export const updateSleepEntry = async (id: string, data: UpdateSleepEntryDto) =>
	(
		await apiClient.patch<UpdateSleepEntryResponse>(
			`/v1/sleep-entries/${id}`,
			data,
		)
	).data;
