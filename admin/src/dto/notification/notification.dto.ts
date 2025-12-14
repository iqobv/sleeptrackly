import { createNotificationSchema } from '@/schemas';
import z from 'zod';

export type CreateNotificationDto = z.infer<typeof createNotificationSchema>;
