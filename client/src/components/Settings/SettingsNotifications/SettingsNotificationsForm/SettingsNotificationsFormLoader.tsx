'use client';

import {SettingsNotificationsFormFieldsLoader} from './SettingsNotificationsFormFields/SettingsNotificationsFormFieldsLoader';
import {SettingsNotificationsReminderLoader} from './SettingsNotificationsReminder/SettingsNotificationsReminderLoader';

export const SettingsNotificationsFormLoader = () => {
	return (
		<>
			<SettingsNotificationsFormFieldsLoader />
			<SettingsNotificationsReminderLoader />
		</>
	);
};
