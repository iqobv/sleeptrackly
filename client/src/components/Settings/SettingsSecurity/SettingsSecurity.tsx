'use client';

import { useAuth } from '@/hooks';
import ChangePassword from './ChangePassword/ChangePassword';
import SettingsDeleteAccount from './SettingsDeleteAccount/SettingsDeleteAccount';
import SettingsEmailConfirmation from './SettingsEmailConfirmation/SettingsEmailConfirmation';
import styles from './SettingsSecurity.module.scss';
import SettingsSessions from './SettingsSessions/SettingsSessions';

const SettingsSecurity = () => {
	const { user } = useAuth();

	return (
		<div className={styles['settings-security']}>
			{user && !user?.emailVerified && <SettingsEmailConfirmation />}
			<SettingsSessions />
			<ChangePassword />
			<SettingsDeleteAccount />
		</div>
	);
};

export default SettingsSecurity;
