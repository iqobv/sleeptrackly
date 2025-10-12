'use client';

import { SectionHeader } from '../UI';
import SettingsTabs from './SettingsTabs/SettingsTabs';

const Settings = () => {
	return (
		<div>
			<SectionHeader title="Settings" />
			<SettingsTabs />
		</div>
	);
};

export default Settings;
