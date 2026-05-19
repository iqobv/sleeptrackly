'use client';

import { Dropdown } from '@/components/UI';
import { NotificationPaginated } from '@/types';
import { UseQueryResult } from '@tanstack/react-query';
import styles from './NotificationsList.module.scss';
import NotificationsListItem from './NotificationsListItem/NotificationsListItem';

interface NotificationsListProps {
	queryNotifications: UseQueryResult<NotificationPaginated, Error>;
}

const NotificationsList = ({ queryNotifications }: NotificationsListProps) => {
	const { data, isLoading } = queryNotifications;

	return (
		<Dropdown.Content align="end" sideOffset={10} className={styles.dropdown}>
			<div className={styles.content}>
				{isLoading && <p role="status">Loading...</p>}

				{!isLoading && data?.items.length === 0 && (
					<p className={styles.empty}>No notifications</p>
				)}

				{!isLoading && data && data.items.length > 0 && (
					<div className={styles.container}>
						<div className={styles.header}>
							<h3 className={styles.title}>Notifications</h3>
							{data.items.filter((n) => !n.isRead).length > 0 && (
								<p className={styles.subtitle}>
									You have {data.items.filter((n) => !n.isRead).length} new
									notifications
								</p>
							)}
						</div>

						<div className={styles.list}>
							{data.items.map((notification, index) => (
								<NotificationsListItem
									key={notification.id}
									notification={notification}
									withDivider={index < data.items.length - 1}
								/>
							))}
						</div>
					</div>
				)}
			</div>
		</Dropdown.Content>
	);
};

export default NotificationsList;
