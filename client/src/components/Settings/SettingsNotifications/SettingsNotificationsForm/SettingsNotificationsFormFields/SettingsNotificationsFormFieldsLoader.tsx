'use client';

import { SkeletonLoader } from '@/components/UI';
import { SETTINGS_NOTIFICATIONS_FIELDS } from './settingsNotificationsFormFieldsList';

export const SettingsNotificationsFormFieldsLoader = () => {
	return (
		<>
			{SETTINGS_NOTIFICATIONS_FIELDS.map((f) => (
				<SkeletonLoader key={f.name} height={46} width="100%" />
			))}
		</>
	);
};
