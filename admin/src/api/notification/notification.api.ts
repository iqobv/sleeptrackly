import { CreateNotificationDto } from '@/dto';
import { apiClient } from '../axios';

export const createNotification = async (dto: CreateNotificationDto) =>
	(await apiClient.post('/v1/notifications', dto)).data;
