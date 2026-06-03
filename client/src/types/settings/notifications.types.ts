import { getUserNotificationSettings } from '@/api';

export type NotificationSettings = Awaited<
	ReturnType<typeof getUserNotificationSettings>
>;
