import { CreateNotificationDto } from '@/dto';
import { fetcher } from '@/utils';

export const createNotification = async (dto: CreateNotificationDto) =>
	await fetcher(
		'/api/v1/notifications',
		{
			method: 'POST',
			body: JSON.stringify(dto),
		},
		true
	);
