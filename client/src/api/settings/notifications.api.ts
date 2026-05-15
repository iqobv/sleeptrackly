import { UpdateNotificationSettingsDto } from '@/dto';
import { NotificationSettings } from '@/types';
import { apiClient } from '../axios';

export const getUserNotificationSettings = async () =>
	(await apiClient.get<NotificationSettings>('/v1/settings/notifications/me'))
		.data;

export const updateUserNotificationSettings = async (
	dto: UpdateNotificationSettingsDto,
) =>
	(
		await apiClient.patch<NotificationSettings>(
			'/v1/settings/notifications',
			dto,
		)
	).data;
