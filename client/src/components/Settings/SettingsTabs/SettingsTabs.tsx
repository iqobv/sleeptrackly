'use client';

import { Loader } from '@/components/UI';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import SettingsTab from './SettingsTab/SettingsTab';
import styles from './SettingsTabs.module.scss';
import { SETTINGS_TABS, SettingsTab as SettingsTabType } from './tabs';

const SettingsTabs = () => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const [loading, setLoading] = useState(true);

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
	}, [searchParams, setActiveTab]);

	useEffect(() => {
		const newParams = new URLSearchParams(searchParams);
		newParams.set('tab', activeTab.name);
		router.push(`?${newParams.toString()}`);

		setLoading(true);
		const timer = setTimeout(() => {
			setLoading(false);
		}, 400);

		return () => clearTimeout(timer);
	}, [activeTab, router, searchParams, setLoading]);

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
