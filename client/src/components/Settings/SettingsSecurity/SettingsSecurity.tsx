'use client';

import { useAuth } from '@/hooks';
import ChangePassword from './ChangePassword/ChangePassword';
import SettingsDeleteAccount from './SettingsDeleteAccount/SettingsDeleteAccount';
import SettingsEmailConfirmation from './SettingsEmailConfirmation/SettingsEmailConfirmation';
import styles from './SettingsSecurity.module.scss';

const SettingsSecurity = () => {
	const { user } = useAuth();

	return (
		<div className={styles['settings-security']}>
			{!user?.emailVerified && <SettingsEmailConfirmation />}
			<ChangePassword />
			<SettingsDeleteAccount />
		</div>
	);
};

export default SettingsSecurity;
