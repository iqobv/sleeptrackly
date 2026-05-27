'use client';

import { UpdateFunction } from '../SettingsNotificationsForm.types';
import { SettingsNotificationsFormField } from './SettingsNotificationsFormField/SettingsNotificationsFormField';
import { SETTINGS_NOTIFICATIONS_FIELDS } from './settingsNotificationsFormFieldsList';

interface SettingsNotificationsFormFieldsProps {
	updateSetting: UpdateFunction;
}

export const SettingsNotificationsFormFields = ({
	updateSetting,
}: SettingsNotificationsFormFieldsProps) => {
	return (
		<>
			{SETTINGS_NOTIFICATIONS_FIELDS.map((field) => (
				<SettingsNotificationsFormField
					key={field.name}
					name={field.name}
					label={field.label}
					updateSetting={updateSetting}
				/>
			))}
		</>
	);
};
