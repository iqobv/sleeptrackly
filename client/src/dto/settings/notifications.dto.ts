import { SettingsNotificationsSchema } from '@/schemas';
import z from 'zod';

export type UpdateNotificationSettingsDto = z.infer<
	typeof SettingsNotificationsSchema
>;
