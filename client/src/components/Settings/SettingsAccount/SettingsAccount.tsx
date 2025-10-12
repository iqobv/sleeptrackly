'use client';

import { updateUser } from '@/api';
import { SettingsAccountDto } from '@/dto';
import { useAuth } from '@/hooks';
import { IUser } from '@/types';
import SettingsForm from '../SettingsForm/SettingsForm';
import UploadAvatar from '../UploadAvatar/UploadAvatar';
import { ACCOUNT_FIELDS } from './settingsAccountFields';

import styles from './SettingsAccount.module.scss';

const SettingsAccount = () => {
	const { user } = useAuth();

	return (
		<div className={styles['settings-account']}>
			<UploadAvatar />
			<SettingsForm<SettingsAccountDto, IUser>
				fields={ACCOUNT_FIELDS}
				mutationFn={updateUser}
				defaultValues={{
					username: user?.username || '',
				}}
			/>
		</div>
	);
};

export default SettingsAccount;
