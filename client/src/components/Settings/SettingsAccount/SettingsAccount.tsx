'use client';

import { updateUser } from '@/api/user/user.api';
import { SettingsAccountDto } from '@/dto/settings/settings.dto';
import { useAuth } from '@/hooks/useAuth.hook';
import { SettingsForm } from '../SettingsForm/SettingsForm';
import { UploadAvatar } from '../UploadAvatar/UploadAvatar';
import styles from './SettingsAccount.module.scss';
import { ACCOUNT_FIELDS } from './settingsAccountFields';
import { SettingsAccountLoader } from './SettingsAccountLoader';

type UpdatedAccount = Awaited<ReturnType<typeof updateUser>>;

export const SettingsAccount = () => {
	const { user, isloading } = useAuth();

	return (
		<div className={styles.settingsAccount}>
			<UploadAvatar />
			{isloading && <SettingsAccountLoader />}
			{!isloading && user && (
				<SettingsForm<SettingsAccountDto, UpdatedAccount>
					fields={ACCOUNT_FIELDS}
					mutationFn={updateUser}
					defaultValues={{
						username: user?.username || '',
					}}
				/>
			)}
		</div>
	);
};
