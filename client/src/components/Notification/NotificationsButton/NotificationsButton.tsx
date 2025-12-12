'use client';

import { getNotifications } from '@/api';
import { Button } from '@/components/UI';
import { QUERY_KEYS } from '@/config';
import { useAuth } from '@/hooks';
import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { MdOutlineNotifications } from 'react-icons/md';
import NotificationsList from '../NotificationsList/NotificationsList';
import styles from './NotificationsButton.module.scss';

const NotificationsButton = () => {
	const [isOpen, setIsOpen] = useState(false);

	const buttonRef = useRef<HTMLDivElement | null>(null);

	const { user } = useAuth();

	const queryNotifications = useQuery({
		queryFn: getNotifications,
		queryKey: QUERY_KEYS.notifications.all(user?.id ?? ''),
		enabled: !!user,
		staleTime: 1000 * 60 * 5,
	});

	const haveUnread = queryNotifications.data
		? queryNotifications.data.items.some((n) => !n.isRead)
		: false;

	return (
		<div className={styles['notifications-button']} ref={buttonRef}>
			<Button
				isIcon
				size="sm"
				variant="outlined"
				onClick={() => setIsOpen(!isOpen)}
			>
				<MdOutlineNotifications size={24} />
			</Button>
			{haveUnread && <span className={styles['notifications-button__badge']} />}
			<NotificationsList
				buttonRef={buttonRef as React.RefObject<HTMLDivElement>}
				isOpen={isOpen}
				queryNotifications={queryNotifications}
				onClose={() => setIsOpen(false)}
			/>
		</div>
	);
};

export default NotificationsButton;
