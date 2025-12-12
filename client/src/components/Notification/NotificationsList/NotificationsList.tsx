'use client';

import { TNotificationPaginated } from '@/types';
import { UseQueryResult } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import styles from './NotificationsList.module.scss';
import NotificationsListItem from './NotificationsListItem/NotificationsListItem';
import { useNotificationsList } from './useNotificationsList.hook';

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
	const containerRef = useRef<HTMLDivElement>(null);

	const { position, data, isLoading, handleClose } = useNotificationsList({
		buttonRef,
		isOpen,
		width: WIDTH,
		queryNotifications,
		onClose,
	});

	useEffect(() => {
		if (isOpen && containerRef.current) {
			containerRef.current.scrollTop = 0;
		}
	}, [isOpen, containerRef]);

	return (
		<div
			className={`${styles['notifications']} ${
				isOpen ? styles['notifications--open'] : ''
			}`}
			style={
				{
					'--top': `${position.top}px`,
					'--left': `${position.left}px`,
					'--width': `${WIDTH}px`,
				} as React.CSSProperties
			}
			role="dialog"
			aria-modal="true"
			aria-label="Notifications"
			aria-hidden={!isOpen}
			ref={containerRef}
		>
			{isLoading && <p role="status">Loading...</p>}
			{!isLoading && data?.items.length === 0 && <p>No notifications</p>}
			{!isLoading && data && data.items.length > 0 && (
				<div className={styles['notifications__container']}>
					<div className={styles['notifications__header']}>
						<h3 className={styles['notifications__title']}>Notifications</h3>
						{data.items.length > 0 &&
							data.items.filter((n) => !n.isRead).length > 0 && (
								<div>
									<p className={styles['notifications__subtitle']}>
										You have {data.items.filter((n) => !n.isRead).length} new
										notifications
									</p>
								</div>
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
	);
};

export default NotificationsList;
