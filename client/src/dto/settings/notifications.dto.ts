import { SettingsNotificationsSchema } from '@/schemas/settings/settingsNotifications.schema';
import z from 'zod';

export type UpdateNotificationSettingsDto = z.infer<
	typeof SettingsNotificationsSchema
>;
