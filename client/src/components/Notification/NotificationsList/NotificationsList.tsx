'use client';

import { markAllNotificationsAsRead } from '@/api';
import { Dropdown } from '@/components/UI';
import { QUERY_KEYS } from '@/config';
import { useAuth } from '@/hooks';
import { TNotificationPaginated } from '@/types';
import { useMutation, UseQueryResult } from '@tanstack/react-query';
import styles from './NotificationsList.module.scss';
import NotificationsListItem from './NotificationsListItem/NotificationsListItem';

interface NotificationsListProps {
	buttonRef: React.RefObject<HTMLDivElement> | null;
	isOpen: boolean;
	queryNotifications: UseQueryResult<TNotificationPaginated, Error>;
	onClose: () => void;
}

const WIDTH = 500;

const NotificationsList = ({
	buttonRef,
	isOpen,
	queryNotifications,
	onClose,
}: NotificationsListProps) => {
	const { user } = useAuth();
	const { data, isLoading } = queryNotifications;

	const { mutate } = useMutation({
		mutationFn: markAllNotificationsAsRead,
		mutationKey: QUERY_KEYS.notifications.markAllAsRead(user?.id ?? ''),
		onSuccess: () => queryNotifications.refetch(),
	});

	const handleClose = () => {
		const haveUnread = data?.items.some((n) => !n.isRead);
		if (haveUnread) mutate();
		onClose();
	};
	return (
		<Dropdown
			buttonRef={buttonRef}
			isOpen={isOpen}
			onClose={handleClose}
			width={WIDTH}
		>
			<div className={styles['notifications__content']}>
				{isLoading && <p role="status">Loading...</p>}

				{!isLoading && data?.items.length === 0 && (
					<p className={styles.empty}>No notifications</p>
				)}

				{!isLoading && data && data.items.length > 0 && (
					<div className={styles['notifications__container']}>
						<div className={styles['notifications__header']}>
							<h3 className={styles['notifications__title']}>Notifications</h3>
							{data.items.filter((n) => !n.isRead).length > 0 && (
								<p className={styles['notifications__subtitle']}>
									You have {data.items.filter((n) => !n.isRead).length} new
									notifications
								</p>
							)}
						</div>

						<div className={styles['notifications__list']}>
							{data.items.map((notification, index) => (
								<NotificationsListItem
									key={notification.id}
									notification={notification}
									withDivider={index < data.items.length - 1}
									onClose={handleClose}
								/>
							))}
						</div>
					</div>
				)}
			</div>
		</Dropdown>
	);
};

export default NotificationsList;
