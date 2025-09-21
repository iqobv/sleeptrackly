'use client';

import styles from './Settings.module.scss';
import SettingsTabs from './SettingsTabs/SettingsTabs';

const Settings = () => {
	return (
		<div className={styles['settings']}>
			<SettingsTabs />
		</div>
	);
};

export default Settings;
