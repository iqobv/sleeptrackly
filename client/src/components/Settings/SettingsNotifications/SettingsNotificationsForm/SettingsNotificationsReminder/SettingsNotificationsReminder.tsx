'use client';

import { TextField, ToggleSwitch } from '@/components/UI';
import SettingsField from '../../../SettingsField/SettingsField';
import { UpdateFunction } from '../SettingsNotificationsForm.types';
import { useSettingsNotificationsReminder } from './useSettingsNotificationsReminder.hook';

interface SettingsNotificationsReminderProps {
	updateSetting: UpdateFunction;
}

const SettingsNotificationsReminder = ({
	updateSetting,
}: SettingsNotificationsReminderProps) => {
	const {
		reminderToggleField,
		reminderTimeField,
		userTimeZoneField,
		isEnabled,
		handleToggleChange,
		handleTimeBlur,
	} = useSettingsNotificationsReminder({
		updateSetting,
	});

	return (
		<>
			<SettingsField label="Reminder Notifications" mobileDirection="row">
				<ToggleSwitch
					checked={reminderToggleField.value}
					onChange={(e) => handleToggleChange(e.target.checked)}
				/>
			</SettingsField>
			{isEnabled && (
				<SettingsField label="Reminder Time">
					<TextField
						type="time"
						value={reminderTimeField.value || '08:00'}
						onChange={reminderTimeField.onChange}
						onBlur={handleTimeBlur}
					/>
					<input type="hidden" {...userTimeZoneField} />
				</SettingsField>
			)}
		</>
	);
};

export default SettingsNotificationsReminder;
