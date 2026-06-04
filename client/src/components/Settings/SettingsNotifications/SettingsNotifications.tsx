'use client';

import { getUserNotificationSettings } from '@/api/settings/notifications.api';
import { QUERY_KEYS } from '@/config';
import { useAuth } from '@/hooks';
import { useQuery } from '@tanstack/react-query';
import styles from './SettingsNotifications.module.scss';
import { SettingsNotificationsForm } from './SettingsNotificationsForm/SettingsNotificationsForm';
import { SettingsNotificationsLoader } from './SettingsNotificationsLoader';
import { SettingsNotificationsPush } from './SettingsNotificationsPush/SettingsNotificationsPush';

export const SettingsNotifications = () => {
	const { user, isAuthenticated } = useAuth();

	const { data, isLoading } = useQuery({
		queryKey: QUERY_KEYS.notifications.settings(user ? user.id! : ''),
		queryFn: getUserNotificationSettings,
		enabled: isAuthenticated && !!user,
	});

	return (
		<div className={styles.notifications}>
			{isLoading && !data && <SettingsNotificationsLoader />}
			{!isLoading && data && (
				<>
					<SettingsNotificationsPush />
					<SettingsNotificationsForm data={data} />
				</>
			)}
		</div>
	);
};
