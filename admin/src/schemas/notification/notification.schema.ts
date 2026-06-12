import { NotificationType } from '@/types/notification/notification.types';
import z from 'zod';

export const createNotificationSchema = z.object({
	title: z.string().min(5, 'Title must be at least 5 characters long'),
	body: z.string().min(10, 'Body must be at least 10 characters long'),
	type: z.enum(NotificationType, { error: 'Invalid notification type' }),
	isGlobal: z.boolean(),
	showInApp: z.boolean(),
	isEmail: z.boolean().optional(),
	redirectUrl: z.string().optional(),
});
