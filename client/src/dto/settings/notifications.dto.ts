import {
	reminderTimeSchema,
	settingsNotificationsSchema,
} from '@/schemas/settings/settingsNotifications.schema';
import { z } from 'zod';

export type UpdateReminderTimeDto = z.infer<typeof reminderTimeSchema>;
export type UpdateNotificationSettingsDto = z.infer<
	typeof settingsNotificationsSchema
>;
