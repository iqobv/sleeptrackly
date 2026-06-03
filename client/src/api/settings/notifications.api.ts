import { UpdateNotificationSettingsDto } from '@/dto';
import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type GetUserNotificationSettingsResponse =
	paths['/v1/settings/notifications/me']['get']['responses']['200']['content']['application/json'];
type UpdateUserNotificationSettingsResponse =
	paths['/v1/settings/notifications']['patch']['responses']['200']['content']['application/json'];

export const getUserNotificationSettings = async () =>
	(
		await apiClient.get<GetUserNotificationSettingsResponse>(
			'/v1/settings/notifications/me',
		)
	).data;

export const updateUserNotificationSettings = async (
	dto: UpdateNotificationSettingsDto,
) =>
	(
		await apiClient.patch<UpdateUserNotificationSettingsResponse>(
			'/v1/settings/notifications',
			dto,
		)
	).data;
