import { createNotificationSchema } from '@/schemas/notification/notification.schema';
import z from 'zod';

export type CreateNotificationDto = z.infer<typeof createNotificationSchema>;
