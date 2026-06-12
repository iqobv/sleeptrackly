'use client';

import {
	checkFcmTokenStatus,
	removeFcmToken,
	saveFcmToken,
} from '@/api/user/fcmToken.api';
import { getFcmToken } from '@/utils/fcm/getFcmToken.util';
import { useEffect, useState } from 'react';

export const useSettingsNotificationsPush = () => {
	const [isPushEnabled, setIsPushEnabled] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const loadStatus = async () => {
			if (typeof window === 'undefined' || !('Notification' in window)) {
				setIsLoading(false);
				return;
			}

			const browserPermission = Notification.permission;

			if (browserPermission === 'granted') {
				const localToken = await getFcmToken();

				if (localToken) {
					const isRegistered = await checkFcmTokenStatus(localToken);

					if (isRegistered) {
						setIsPushEnabled(true);
					}
				}
			}
			setIsLoading(false);
		};

		loadStatus();
	}, []);

	const handleTogglePush = async (isEnabled: boolean) => {
		if (!('Notification' in window) || !('serviceWorker' in navigator)) {
			return;
		}

		if (isEnabled) {
			const permission = await Notification.requestPermission();

			if (permission !== 'granted') {
				setIsPushEnabled(false);
				return;
			}

			const token = await getFcmToken();

			if (token) {
				await saveFcmToken(token);
				setIsPushEnabled(true);
			}
		} else {
			const token = await getFcmToken();

			if (token) {
				await removeFcmToken(token);
				setIsPushEnabled(false);
			}
		}
	};

	return { isPushEnabled, isLoading, handleTogglePush };
};
