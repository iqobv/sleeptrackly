import { INotification, TNotificationPaginated } from '@/types';
import { fetcher } from '@/utils';

export const getNotifications = async () =>
	await fetcher<TNotificationPaginated>(
		'/v1/notifications/me',
		{
			method: 'GET',
		},
		true,
	);

export const markAllNotificationsAsRead = async () =>
	await fetcher<INotification[]>(
		'/v1/notifications/read-all',
		{
			method: 'PATCH',
		},
		true,
	);
