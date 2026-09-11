'use client';

import { SettingsField } from '@/components/Settings/SettingsField/SettingsField';
import { ToggleSwitch } from '@shared/ui';
import {
	NotificationFieldName,
	UpdateFunction,
} from '../../SettingsNotificationsForm.types';
import { useSettingsNotificationsFormField } from './useSettingsNotificationsFormField.hook';

interface SettingsNotificationsFormFieldProps {
	name: NotificationFieldName;
	label: string;
	updateSetting: UpdateFunction;
}

export const SettingsNotificationsFormField = ({
	name,
	label,
	updateSetting,
}: SettingsNotificationsFormFieldProps) => {
	const { controlledField, handleUpdate } = useSettingsNotificationsFormField({
		name,
		updateSetting,
	});

	return (
		<SettingsField key={name} label={label} mobileDirection="row">
			<ToggleSwitch
				checked={controlledField.value}
				onChange={(e) => {
					controlledField.onChange(e.target.checked);
					handleUpdate(name, e.target.checked);
				}}
			/>
		</SettingsField>
	);
};
