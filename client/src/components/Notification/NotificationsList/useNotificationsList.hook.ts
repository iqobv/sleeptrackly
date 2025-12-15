'use client';

import { markAllNotificationsAsRead } from '@/api';
import { QUERY_KEYS } from '@/config';
import { useAuth } from '@/hooks';
import { TNotificationPaginated } from '@/types';
import { useMutation, UseQueryResult } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';

interface UseNotificationsListProps {
	buttonRef: React.RefObject<HTMLDivElement> | null;
	isOpen: boolean;
	width?: number;
	queryNotifications: UseQueryResult<TNotificationPaginated, Error>;
	onClose: () => void;
}

export const useNotificationsList = ({
	buttonRef,
	isOpen,
	width = 500,
	queryNotifications,
	onClose,
}: UseNotificationsListProps) => {
	const [position, setPosition] = useState<{
		top: number;
		left: number;
	}>({
		top: 0,
		left: 0,
	});

	const { user } = useAuth();

	const { mutate } = useMutation({
		mutationFn: markAllNotificationsAsRead,
		mutationKey: QUERY_KEYS.notifications.markAllAsRead(user?.id ?? ''),
		onSuccess: () => {
			queryNotifications.refetch();
		},
	});

	const handleClose = useCallback(() => {
		onClose();
		buttonRef?.current?.focus();
		if (queryNotifications.data) {
			const haveUnread = queryNotifications.data.items.some((n) => !n.isRead);
			if (haveUnread) mutate();
		}
	}, [onClose, buttonRef, queryNotifications, mutate]);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (isOpen && event.key === 'Escape') {
				event.preventDefault();
				handleClose();
			}
		};

		if (isOpen) {
			document.addEventListener('keydown', handleKeyDown);
		}

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [isOpen, onClose, buttonRef, handleClose]);

	const handleClickOutside = useCallback(
		(event: MouseEvent) => {
			if (
				isOpen &&
				buttonRef?.current &&
				!buttonRef.current.contains(event.target as Node)
			) {
				handleClose();
			}
		},
		[isOpen, handleClose, buttonRef]
	);

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, buttonRef, handleClickOutside]);

	useEffect(() => {
		if (buttonRef?.current && isOpen) {
			const updatePosition = () => {
				if (!buttonRef.current) return;

				const screenWidth = window.innerWidth;
				const rect = buttonRef.current.getBoundingClientRect();

				let newLeft = rect.left;

				if (rect.right + width > screenWidth) {
					newLeft = rect.right - width;
				}

				setPosition({
					top: rect.bottom + 8,
					left: newLeft,
				});
			};

			updatePosition();
			window.addEventListener('resize', updatePosition);

			return () => window.removeEventListener('resize', updatePosition);
		}
	}, [buttonRef, width, isOpen]);

	useEffect(() => {
		document.body.style.overflow = isOpen ? 'hidden' : 'auto';

		return () => {
			document.body.style.overflow = 'auto';
		};
	}, [isOpen]);

	return {
		position,
		data: queryNotifications.data,
		isLoading: queryNotifications.isLoading,
		handleClose,
	};
};
