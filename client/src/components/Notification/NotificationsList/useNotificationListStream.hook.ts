'use client';

import { QUERY_KEYS } from '@/config/queryClient.config';
import { env } from '@/env';
import { SseSignalPayload } from '@/types/api/sseSignalPayload.types';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useNotificationStream = () => {
	const queryClient = useQueryClient();

	useEffect(() => {
		const eventSource = new EventSource(
			`${env.NEXT_PUBLIC_API_URL}/v1/notifications/me/stream`,
			{
				withCredentials: true,
			},
		);

		eventSource.addEventListener(
			'notification_signal',
			(event: MessageEvent<string>) => {
				const payload = JSON.parse(event.data) as SseSignalPayload;

				if (payload.action === 'FETCH_NOTIFICATIONS')
					queryClient.invalidateQueries({
						queryKey: QUERY_KEYS.notifications.list(),
					});
			},
		);

		eventSource.addEventListener('error', () => eventSource.close());

		return () => eventSource.close();
	}, [queryClient]);
};
