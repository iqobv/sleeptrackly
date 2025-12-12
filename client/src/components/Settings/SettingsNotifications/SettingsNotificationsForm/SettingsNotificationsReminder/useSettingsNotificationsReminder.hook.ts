'use client';

import { useCallback } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { UpdateFunction } from '../SettingsNotificationsForm.types';

interface UseSettingsNotificationsReminderProps {
	updateSetting: UpdateFunction;
}

export const useSettingsNotificationsReminder = ({
	updateSetting,
}: UseSettingsNotificationsReminderProps) => {
	const { control, watch, setValue, getValues } = useFormContext();

	const { field: reminderToggleField } = useController({
		name: 'isReminderEnabled',
		control,
	});

	const { field: reminderTimeField } = useController({
		name: 'reminderTime',
		control,
	});

	const { field: userTimeZoneField } = useController({
		name: 'userTimeZone',
		control,
	});

	const isEnabled = watch('isReminderEnabled');

	const handleToggleChange = useCallback(
		(checked: boolean) => {
			reminderToggleField.onChange(checked);

			if (checked) {
				const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
				setValue('userTimeZone', timezone);
				updateSetting({
					isReminderEnabled: checked,
					reminderTime: getValues('reminderTime'),
					userTimeZone: timezone,
				});
			} else {
				updateSetting({ isReminderEnabled: checked });
			}
		},
		[reminderToggleField, updateSetting, setValue, getValues]
	);

	const handleTimeBlur = useCallback(() => {
		const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
		const timeValue = getValues('reminderTime');

		setValue('userTimeZone', timezone);

		updateSetting({
			reminderTime: timeValue,
			userTimeZone: timezone,
		});
	}, [updateSetting, getValues, setValue]);

	return {
		reminderToggleField,
		reminderTimeField,
		userTimeZoneField,
		isEnabled,
		handleToggleChange,
		handleTimeBlur,
	};
};
