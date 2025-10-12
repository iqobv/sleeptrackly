'use client';

import { useSearchParams } from 'next/navigation';

import { useMemo } from 'react';
import { SETTINGS_TABS } from './tabs';

export const useSettingsTabs = () => {
	const searchParams = useSearchParams();
	const tabName = searchParams.get('tab');

	const activeTab = useMemo(() => {
		return (
			SETTINGS_TABS.find((tab) => tab.name === tabName) || SETTINGS_TABS[0]
		);
	}, [tabName]);

	return { activeTab };
};
