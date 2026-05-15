import { UpdateNotificationSettingsDto } from '@/dto';
import { INotificationSettings } from '@/types';
import { apiClient } from '../axios';

export const getUserNotificationSettings = async () =>
	(await apiClient.get<INotificationSettings>('/v1/settings/notifications/me'))
		.data;

export const updateUserNotificationSettings = async (
	dto: UpdateNotificationSettingsDto,
) =>
	(
		await apiClient.patch<INotificationSettings>(
			'/v1/settings/notifications',
			dto,
		)
	).data;
