import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type GetAllNotificationsResponse =
	paths['/v1/notifications/me']['get']['responses']['200']['content']['application/json'];
type MarkAllNotificationsAsReadResponse =
	paths['/v1/notifications/read-all']['patch']['responses']['200']['content']['application/json'];

export const getNotifications = async () =>
	(await apiClient.get<GetAllNotificationsResponse>('/v1/notifications/me'))
		.data;

export const markAllNotificationsAsRead = async () =>
	(
		await apiClient.patch<MarkAllNotificationsAsReadResponse>(
			'/v1/notifications/read-all',
		)
	).data;
