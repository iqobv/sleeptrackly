'use client';

import styles from './Settings.module.scss';
import SettingsForm from './SettingsForm/SettingsForm';

const Settings = () => {
	return (
		<div className={styles['settings']}>
			<SettingsForm />
		</div>
	);
};

export default Settings;
