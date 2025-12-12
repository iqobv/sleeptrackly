'use client';

import SettingsNotificationsFormFieldsLoader from './SettingsNotificationsFormFields/SettingsNotificationsFormFieldsLoader';
import SettingsNotificationsReminderLoader from './SettingsNotificationsReminder/SettingsNotificationsReminderLoader';

const SettingsNotificationsFormLoader = () => {
	return (
		<>
			<SettingsNotificationsFormFieldsLoader />
			<SettingsNotificationsReminderLoader />
		</>
	);
};

export default SettingsNotificationsFormLoader;
