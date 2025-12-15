'use client';

import { useCallback, useRef } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import {
	NotificationFieldName,
	UpdateFunction,
} from '../../SettingsNotificationsForm.types';

interface UseSettingsNotificationsFormFieldProps {
	name: NotificationFieldName;
	updateSetting: UpdateFunction;
}

export const useSettingsNotificationsFormField = ({
	name,
	updateSetting,
}: UseSettingsNotificationsFormFieldProps) => {
	const { control } = useFormContext();
	const debouncedTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	const { field: controlledField } = useController({
		name,
		control,
	});

	const handleUpdate = useCallback(
		(key: NotificationFieldName, value: boolean) => {
			if (debouncedTimeoutRef.current) {
				clearTimeout(debouncedTimeoutRef.current);
			}
			debouncedTimeoutRef.current = setTimeout(() => {
				updateSetting({ [key]: value });
			}, 300);
		},
		[updateSetting]
	);

	return { controlledField, handleUpdate };
};
