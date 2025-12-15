import { UpdateNotificationSettingsDto } from '@/dto';
import { INotificationSettings } from '@/types';
import { fetcher } from '@/utils';

export const getUserNotificationSettings = async () =>
	await fetcher<INotificationSettings>(
		'/api/v1/settings/notifications/me',
		{ method: 'GET' },
		true
	);

export const updateUserNotificationSettings = async (
	dto: UpdateNotificationSettingsDto
) =>
	await fetcher<INotificationSettings>(
		'/api/v1/settings/notifications',
		{
			method: 'PATCH',
			body: JSON.stringify(dto),
		},
		true
	);
