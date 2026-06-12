import { CreateNotificationDto } from '@/dto/notification/notification.dto';
import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type CreateNotificationResponse =
	paths['/v1/notifications']['post']['responses']['200']['content']['application/json'];

export const createNotification = async (dto: CreateNotificationDto) =>
	(await apiClient.post<CreateNotificationResponse>('/v1/notifications', dto))
		.data;
