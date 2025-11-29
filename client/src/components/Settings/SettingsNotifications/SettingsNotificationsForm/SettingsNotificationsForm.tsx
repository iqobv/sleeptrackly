'use client';

import { INotificationSettings } from '@/types';
import { FormProvider } from 'react-hook-form';
import styles from './SettingsNotificationsForm.module.scss';
import SettingsNotificationsFormFields from './SettingsNotificationsFormFields/SettingsNotificationsFormFields';
import SettingsNotificationsReminder from './SettingsNotificationsReminder/SettingsNotificationsReminder';
import { useSettingsNotificationsForm } from './useSettingsNotificationsForm.hook';

interface SettingsNotificationsFormProps {
	data: INotificationSettings;
}

const SettingsNotificationsForm = ({
	data,
}: SettingsNotificationsFormProps) => {
	const { methods, updateSetting } = useSettingsNotificationsForm({
		data,
	});

	return (
		<FormProvider {...methods}>
			<form className={styles['notifications-form']}>
				<SettingsNotificationsFormFields updateSetting={updateSetting} />
				<SettingsNotificationsReminder updateSetting={updateSetting} />
			</form>
		</FormProvider>
	);
};

export default SettingsNotificationsForm;
