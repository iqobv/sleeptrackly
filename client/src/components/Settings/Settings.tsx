'use client';

import { SectionHeader } from '@shared/ui';
import { SettingsTabs } from './SettingsTabs/SettingsTabs';

export const Settings = () => {
	return (
		<div>
			<SectionHeader title="Settings" />
			<SettingsTabs />
		</div>
	);
};
