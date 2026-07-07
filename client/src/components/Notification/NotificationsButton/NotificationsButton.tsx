'use client';

import {
	getNotifications,
	markAllNotificationsAsRead,
} from '@/api/notification/notification.api';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { Button, Dropdown, DropdownTrigger } from '@shared/ui';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { MdOutlineNotifications } from 'react-icons/md';
import { NotificationsList } from '../NotificationsList/NotificationsList';
import styles from './NotificationsButton.module.scss';

export const NotificationsButton = () => {
	const [isOpen, setIsOpen] = useState(false);

	const queryNotifications = useQuery({
		queryFn: getNotifications,
		queryKey: QUERY_KEYS.notifications.list(),
		staleTime: 1000 * 60 * 5,
	});

	const { mutate } = useMutation({
		mutationFn: markAllNotificationsAsRead,
		onSuccess: () => queryNotifications.refetch(),
	});

	const haveUnread = queryNotifications.data
		? queryNotifications.data.items.some((n) => !n.isRead)
		: false;

	const handleOpenChange = (open: boolean) => {
		setIsOpen(open);

		if (!open && haveUnread) {
			mutate();
		}
	};

	return (
		<Dropdown open={isOpen} onOpenChange={handleOpenChange}>
			<DropdownTrigger asChild>
				<Button
					isIcon
					size="sm"
					variant="outlined"
					className={`${styles.button} ${haveUnread ? styles.unread : ''}`}
				>
					<MdOutlineNotifications size={24} />
				</Button>
			</DropdownTrigger>
			<NotificationsList queryNotifications={queryNotifications} />
		</Dropdown>
	);
};
