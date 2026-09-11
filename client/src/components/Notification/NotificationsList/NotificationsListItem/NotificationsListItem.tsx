'use client';

import { WeeklySummary } from '@/components/WeeklySummary/WeeklySummary';
import { PRIVATE_PAGES } from '@/config/privatePages.config';
import { Notification } from '@/types/notification/notification.types';
import { NotificationType } from '@shared/types';
import { Button, Divider, DropdownItem, Modal, ModalTrigger } from '@shared/ui';
import clsx from 'clsx';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import styles from './NotificationsListItem.module.scss';
import { NotificationsListItemRedirect } from './NotificationsListItemRedirect';

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
				className={clsx(styles.item, isUnread && styles.unread)}
			>
				<div className={styles.content}>
					<p className={styles.title}>{notification.title}</p>
					{notification.body && (
						<p className={styles.body}>{notification.body}</p>
					)}
				</div>
				{notification.type === NotificationType.FRIEND_REQUEST && (
					<NotificationsListItemRedirect href={PRIVATE_PAGES.FRIENDS.REQUESTS}>
						View
					</NotificationsListItemRedirect>
				)}
				{(notification.type === NotificationType.CHALLENGE_FROZEN ||
					notification.type === NotificationType.CHALLENGE_FAILED ||
					notification.type === NotificationType.CHALLENGE_EXPIRED) && (
					<NotificationsListItemRedirect
						href={PRIVATE_PAGES.CHALLENGES.BY_ID(notification.challengeId!)}
					>
						View
					</NotificationsListItemRedirect>
				)}
				{notification.redirectUrl && (
					<NotificationsListItemRedirect href={notification.redirectUrl}>
						Open
					</NotificationsListItemRedirect>
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
