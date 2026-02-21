'use client';

import ChangePassword from './ChangePassword/ChangePassword';
import SettingsDeleteAccount from './SettingsDeleteAccount/SettingsDeleteAccount';
import styles from './SettingsSecurity.module.scss';
import SettingsSessions from './SettingsSessions/SettingsSessions';

const SettingsSecurity = () => {
	return (
		<div className={styles['settings-security']}>
			<SettingsSessions />
			<ChangePassword />
			<SettingsDeleteAccount />
		</div>
	);
};

export default SettingsSecurity;
