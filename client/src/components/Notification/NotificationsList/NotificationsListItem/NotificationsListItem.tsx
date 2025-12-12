'use client';

import { Button, Divider } from '@/components/UI';
import { INotification } from '@/types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import styles from './NotificationsListItem.module.scss';

dayjs.extend(relativeTime);

interface NotificationsListItemProps {
	notification: INotification;
	withDivider?: boolean;
	onClose?: () => void;
}

const NotificationsListItem = ({
	notification,
	withDivider,
	onClose,
}: NotificationsListItemProps) => {
	const isUnread = !notification.isRead;

	return (
		<>
			<div
				id={notification.id}
				className={`${styles['notification-item']} ${
					isUnread ? styles['notification-item--unread'] : ''
				}`}
			>
				<div className={styles['notification-item__content']}>
					<p className={styles['notification-item__title']}>
						{notification.title}
					</p>
					{notification.body && (
						<p className={styles['notification-item__body']}>
							{notification.body}
						</p>
					)}
				</div>
				{notification.redirectUrl && (
					<Button
						fullWidth
						href={notification.redirectUrl}
						size="sm"
						variant="outlined"
						onClick={() => onClose && onClose()}
					>
						Open
					</Button>
				)}
				<div className={styles['notification-item__date']}>
					{dayjs(notification.createdAt).fromNow()}
				</div>
			</div>
			{withDivider && <Divider />}
		</>
	);
};

export default NotificationsListItem;
