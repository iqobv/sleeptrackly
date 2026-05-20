'use client';

import { Button, Divider, Dropdown, Modal } from '@/components/UI';
import { WeeklySummary } from '@/components/WeeklySummary';
import { Notification, NotificationType } from '@/types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Link from 'next/link';
import styles from './NotificationsListItem.module.scss';

dayjs.extend(relativeTime);

interface NotificationsListItemProps {
	notification: Notification;
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
				className={`${styles.item} ${isUnread ? styles.unread : ''}`}
			>
				<div className={styles.content}>
					<p className={styles.title}>{notification.title}</p>
					{notification.body && (
						<p className={styles.body}>{notification.body}</p>
					)}
				</div>
				{notification.redirectUrl && (
					<Dropdown.Item asChild>
						<Button
							fullWidth
							size="sm"
							variant="outlined"
							onClick={() => onClose && onClose()}
							asChild
						>
							<Link href={notification.redirectUrl}>Open</Link>
						</Button>
					</Dropdown.Item>
				)}
				{notification.type === NotificationType.WEEKLY_SUMMARY &&
					notification.weeklySleepSummaryId && (
						<Dropdown.Item asChild>
							<Modal>
								<Modal.Trigger asChild>
									<Button
										fullWidth
										size="sm"
										variant="outlined"
										onClick={() => onClose && onClose()}
										asChild
									>
										View Summary
									</Button>
								</Modal.Trigger>
								<WeeklySummary id={notification.weeklySleepSummaryId} />
							</Modal>
						</Dropdown.Item>
					)}
				<div className={styles.date}>
					{dayjs(notification.createdAt).fromNow()}
				</div>
			</div>
			{withDivider && <Divider />}
		</>
	);
};

export default NotificationsListItem;
