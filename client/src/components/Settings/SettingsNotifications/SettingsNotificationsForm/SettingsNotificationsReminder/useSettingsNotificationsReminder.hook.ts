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

	const isEnabled = watch('isReminderEnabled');

	const handleToggleChange = useCallback(
		(checked: boolean) => {
			reminderToggleField.onChange(checked);

			if (checked) {
				updateSetting({
					isReminderEnabled: checked,
					reminderTime: getValues('reminderTime'),
				});
			} else {
				updateSetting({ isReminderEnabled: checked });
			}
		},
		[reminderToggleField, updateSetting, setValue, getValues],
	);

	const handleTimeBlur = useCallback(() => {
		const timeValue = getValues('reminderTime');

		updateSetting({
			reminderTime: timeValue,
		});
	}, [updateSetting, getValues, setValue]);

	return {
		reminderToggleField,
		reminderTimeField,
		isEnabled,
		handleToggleChange,
		handleTimeBlur,
	};
};
