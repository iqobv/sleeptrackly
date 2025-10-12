'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { SETTINGS_TABS, type SettingsTab as SettingsTabType } from './tabs';

export const useSettingsTabs = () => {
	const [loading, setLoading] = useState(true);

	const searchParams = useSearchParams();

	const [activeTab, setActiveTab] = useState<SettingsTabType>(
		searchParams.get('tab')
			? SETTINGS_TABS.find((tab) => tab.name === searchParams.get('tab')) ||
					SETTINGS_TABS[0]
			: SETTINGS_TABS[0]
	);

	const router = useRouter();

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

	return { loading, activeTab };
};
