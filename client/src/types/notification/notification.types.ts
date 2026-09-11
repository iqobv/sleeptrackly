import { getNotifications } from '@/api/notification/notification.api';

export type Notification = Awaited<
	ReturnType<typeof getNotifications>
>['items'][number];
