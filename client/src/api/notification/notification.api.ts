import { INotification, TNotificationPaginated } from '@/types';
import { apiClient } from '../axios';

export const getNotifications = async () =>
	(await apiClient.get<TNotificationPaginated>('/v1/notifications/me')).data;

export const markAllNotificationsAsRead = async () =>
	(await apiClient.patch<INotification[]>('/v1/notifications/read-all')).data;
