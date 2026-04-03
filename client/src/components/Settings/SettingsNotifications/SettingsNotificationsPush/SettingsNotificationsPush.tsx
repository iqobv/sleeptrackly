'use client';

import { Loader, ToggleSwitch } from '@/components/UI';
import SettingsField from '../../SettingsField/SettingsField';
import { useSettingsNotificationsPush } from './useSettingsNotificationsPush.hook';

const SettingsNotificationsPush = () => {
	const { isPushEnabled, isLoading, handleTogglePush } =
		useSettingsNotificationsPush();

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

export default SettingsNotificationsPush;
