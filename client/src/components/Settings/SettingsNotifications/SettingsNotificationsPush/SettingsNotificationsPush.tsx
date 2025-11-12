'use client';

import { saveFcmToken } from '@/api/user/fcmToken.api';
import { Button } from '@/components/UI';
import { getFcmToken } from '@/utils';
import { useEffect, useState } from 'react';
import styles from './SettingsNotificationsPush.module.scss';

const SettingsNotificationsPush = () => {
	const [permission, setPermission] =
		useState<NotificationPermission>('default');

	useEffect(() => {
		if (typeof window !== 'undefined' && 'Notification' in window) {
			setPermission(Notification.permission);
		}
	}, []);

	const handleEnablePush = async () => {
		if ('Notification' in window && 'serviceWorker' in navigator) {
			const permission = await Notification.requestPermission();
			if (permission !== 'granted') return;

			const token = await getFcmToken();

			if (!token) return;

			await saveFcmToken(token);
		}
	};

	return (
		<div className={styles['settings-notifications-push']}>
			<Button onClick={handleEnablePush} disabled={permission === 'granted'}>
				{permission === 'granted'
					? 'Push Notifications Enabled'
					: 'Enable Push Notifications'}
			</Button>
		</div>
	);
};

export default SettingsNotificationsPush;
