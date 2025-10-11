'use client';

import { Loader } from '@/components/UI';
import SettingsTab from './SettingsTab/SettingsTab';
import styles from './SettingsTabs.module.scss';
import { SETTINGS_TABS } from './tabs';
import { useSettingsTabs } from './useSettingsTabs';

const SettingsTabs = () => {
	const { loading, activeTab } = useSettingsTabs();

	return (
		<div className={styles['settings-tabs']}>
			<div className={styles['settings-tabs__list']}>
				{SETTINGS_TABS.map((tab) => (
					<SettingsTab
						key={tab.name}
						tab={tab}
						isActive={tab.name === activeTab.name}
					/>
				))}
			</div>
			{loading && <Loader size={50} />}
			{!loading && <div>{activeTab.form}</div>}
		</div>
	);
};

export default SettingsTabs;
