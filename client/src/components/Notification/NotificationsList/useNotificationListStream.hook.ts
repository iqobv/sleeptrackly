'use client';

import { SseSignalPayload } from '@/types/api/sseSignalPayload.types';
import { useEffect } from 'react';

export const useNotificationStream = (refetch: () => void) => {
	useEffect(() => {
		const eventSource = new EventSource(
			`${process.env.NEXT_PUBLIC_API_URL}/v1/notifications/me/stream`,
			{
				withCredentials: true,
			},
		);

		eventSource.addEventListener(
			'notification_signal',
			(event: MessageEvent<string>) => {
				const payload = JSON.parse(event.data) as SseSignalPayload;

				if (payload.action === 'FETCH_NOTIFICATIONS') {
					refetch();
				}
			},
		);

		eventSource.addEventListener('error', () => {
			eventSource.close();
		});

		return () => {
			eventSource.close();
		};
	}, [refetch]);
};
