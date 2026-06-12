'use client';

import { WeeklySummary } from '@/components/WeeklySummary/WeeklySummary';
import { Notification } from '@/types/notification/notification.types';
import { NotificationType } from '@/types/notification/notificationType.types';
import { Button, Divider, DropdownItem, Modal, ModalTrigger } from '@shared/ui';
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

export const NotificationsListItem = ({
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
					<DropdownItem asChild>
						<Button
							fullWidth
							size="sm"
							variant="outlined"
							onClick={() => onClose && onClose()}
							asChild
						>
							<Link href={notification.redirectUrl}>Open</Link>
						</Button>
					</DropdownItem>
				)}
				{notification.type === NotificationType.WEEKLY_SUMMARY &&
					notification.weeklySleepSummaryId && (
						<DropdownItem asChild>
							<Modal>
								<ModalTrigger asChild>
									<Button
										fullWidth
										size="sm"
										variant="outlined"
										onClick={() => onClose && onClose()}
										asChild
									>
										View Summary
									</Button>
								</ModalTrigger>
								<WeeklySummary id={notification.weeklySleepSummaryId} />
							</Modal>
						</DropdownItem>
					)}
				<div className={styles.date}>
					{dayjs(notification.createdAt).fromNow()}
				</div>
			</div>
			{withDivider && <Divider />}
		</>
	);
};
