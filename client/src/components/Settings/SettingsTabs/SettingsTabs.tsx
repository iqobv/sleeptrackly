'use client';

import { List } from '@/components/UI';
import { usePathname } from 'next/navigation';
import { SettingsTab } from './SettingsTab/SettingsTab';
import styles from './SettingsTabs.module.scss';
import { SETTINGS_TABS } from './tabs';

export const SettingsTabs = () => {
	const pathname = usePathname();

	return (
		<nav className={styles.tabs}>
			<List
				items={SETTINGS_TABS}
				className={styles.list}
				isHorizontal
				renderItem={(tab) => (
					<SettingsTab
						key={tab.id}
						tab={tab}
						isActive={pathname === tab.href}
					/>
				)}
			/>
		</nav>
	);
};
