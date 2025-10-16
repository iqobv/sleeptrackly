'use client';

import { PAGES } from '@/config';
import { useRouter } from 'next/navigation';
import SettingsSecurityField from '../SettingsSecurityField/SettingsSecurityField';

const SettingsSessions = () => {
	const router = useRouter();

	const handleCLick = () => router.push(PAGES.SETTINGS_SESSIONS);

	return (
		<>
			<SettingsSecurityField
				action={handleCLick}
				label="View your sessions"
				buttonText="View sessions"
			/>
		</>
	);
};

export default SettingsSessions;
