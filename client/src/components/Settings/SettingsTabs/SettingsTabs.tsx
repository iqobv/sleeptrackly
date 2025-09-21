'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import SettingsTab from './SettingsTab/SettingsTab';
import styles from './SettingsTabs.module.scss';
import { SETTINGS_TABS, SettingsTab as SettingsTabType } from './tabs';

const SettingsTabs = () => {
	const searchParams = useSearchParams();
	const router = useRouter();

	const [activeTab, setActiveTab] = useState<SettingsTabType>(
		searchParams.get('tab')
			? SETTINGS_TABS.find((tab) => tab.name === searchParams.get('tab')) ||
					SETTINGS_TABS[0]
			: SETTINGS_TABS[0]
	);

	useEffect(() => {
		setActiveTab(
			SETTINGS_TABS.find((tab) => tab.name === searchParams.get('tab')) ||
				SETTINGS_TABS[0]
		);
	}, [searchParams]);

	useEffect(() => {
		const newParams = new URLSearchParams(searchParams);
		newParams.set('tab', activeTab.name);
		router.push(`?${newParams.toString()}`);
	}, [activeTab]);

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
			<div className={styles['settings-tabs__form']}>{activeTab.form}</div>
		</div>
	);
};

export default SettingsTabs;
