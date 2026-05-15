import { Notification, NotificationPaginated } from '@/types';
import { apiClient } from '../axios';

export const getNotifications = async () =>
	(await apiClient.get<NotificationPaginated>('/v1/notifications/me')).data;

export const markAllNotificationsAsRead = async () =>
	(await apiClient.patch<Notification[]>('/v1/notifications/read-all')).data;
