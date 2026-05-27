'use client';

import { SectionHeader } from '../UI';
import { SettingsTabs } from './SettingsTabs/SettingsTabs';

export const Settings = () => {
	return (
		<div>
			<SectionHeader title="Settings" />
			<SettingsTabs />
		</div>
	);
};
