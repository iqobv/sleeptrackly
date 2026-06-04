import { getNotifications } from '@/api';

export type Notification = Awaited<
	ReturnType<typeof getNotifications>
>['items'][number];
