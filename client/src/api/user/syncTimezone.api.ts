import { SyncTimezoneDto } from '@/dto/user/syncTimezone.dto';
import { paths } from '@shared/types';
import { apiClient } from '../axios';

type SyncTimezoneResponse =
	paths['/v1/users/me/timezone']['patch']['responses']['200']['content']['application/json'];

export const syncTimezone = async (data: SyncTimezoneDto) =>
	(await apiClient.patch<SyncTimezoneResponse>('/v1/users/me/timezone', data))
		.data;
