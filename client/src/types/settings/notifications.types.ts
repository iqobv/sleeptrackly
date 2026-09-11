import { getUserNotificationSettings } from '@/api/settings/notifications.api';

export type NotificationSettings = Awaited<
	ReturnType<typeof getUserNotificationSettings>
>;
