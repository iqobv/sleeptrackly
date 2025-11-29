'use client';

import { SkeletonLoader } from '@/components/UI';
import styles from './SettingsNotifications.module.scss';
import SettingsNotificationsFormLoader from './SettingsNotificationsForm/SettingsNotificationsFormLoader';

const SettingsNotificationsLoader = () => {
	return (
		<div className={styles['settings-notifications']}>
			<SkeletonLoader height={46} width="100%" />
			<SettingsNotificationsFormLoader />
		</div>
	);
};

export default SettingsNotificationsLoader;
