'use client';

import { List } from '@/components/UI';
import SettingsTab from './SettingsTab/SettingsTab';
import styles from './SettingsTabs.module.scss';
import { SETTINGS_TABS } from './tabs';
import { useSettingsTabs } from './useSettingsTabs';

const SettingsTabs = () => {
	const { activeTab } = useSettingsTabs();

	return (
		<div className={styles.tabs}>
			<List
				items={SETTINGS_TABS}
				className={styles.list}
				isHorizontal
				renderItem={(tab) => (
					<SettingsTab
						key={tab.name}
						tab={tab}
						isActive={tab.name === activeTab.name}
					/>
				)}
			/>
			{<div>{activeTab.form}</div>}
		</div>
	);
};

export default SettingsTabs;
