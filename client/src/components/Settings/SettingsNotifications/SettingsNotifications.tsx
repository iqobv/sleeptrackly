'use client';

import styles from './SettingsNotifications.module.scss';
import SettingsNotificationsPush from './SettingsNotificationsPush/SettingsNotificationsPush';

const SettingsNotifications = () => {
	return (
		<div className={styles['settings-notifications']}>
			SettingsNotifications
			<SettingsNotificationsPush />
		</div>
	);
};

export default SettingsNotifications;
