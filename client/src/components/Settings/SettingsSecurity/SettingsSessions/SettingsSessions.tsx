'use client';

import { PRIVATE_PAGES } from '@/config';
import { useRouter } from 'next/navigation';
import { SettingsSecurityField } from '../SettingsSecurityField/SettingsSecurityField';

export const SettingsSessions = () => {
	const router = useRouter();

	const handleCLick = () => router.push(PRIVATE_PAGES.SETTINGS.SESSIONS);

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
