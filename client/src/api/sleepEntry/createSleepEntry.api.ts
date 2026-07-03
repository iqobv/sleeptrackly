import { CreateSleepEntryFormDto } from '@/dto/sleepEntry/sleepEntry.dto';
import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type CreateSleepEntryResponse =
	paths['/v1/sleep-entries']['post']['responses']['200']['content']['application/json'];

export const createSleepEntry = async (data: CreateSleepEntryFormDto) =>
	(await apiClient.post<CreateSleepEntryResponse>('/v1/sleep-entries', data))
		.data;
