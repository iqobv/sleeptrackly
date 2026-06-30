'use client';

import { usePushNotifications } from '@/hooks/usePushNotifications.hook';
import { Loader, ToggleSwitch } from '@shared/ui';
import { SettingsField } from '../../SettingsField/SettingsField';

export const SettingsNotificationsPush = () => {
	const { isPushEnabled, isLoading, handleTogglePush } = usePushNotifications();

	return (
		<SettingsField label="Enable Push Notifications" mobileDirection="row">
			<>
				{isLoading ? (
					<Loader
						disablePadding
						containerStyle={{ width: 'unset' }}
						size={24}
					/>
				) : (
					<ToggleSwitch
						checked={isPushEnabled}
						onChange={(e) => handleTogglePush(e.target.checked)}
					/>
				)}
			</>
		</SettingsField>
	);
};
