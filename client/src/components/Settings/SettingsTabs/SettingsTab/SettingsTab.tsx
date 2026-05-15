'use client';

import Link from 'next/link';
import { SettingsTab as SettingsTabType } from '../tabs';
import styles from './SettingsTab.module.scss';

interface SettingsTabProps {
	tab: SettingsTabType;
	isActive?: boolean;
}

const SettingsTab = ({ tab, isActive = false }: SettingsTabProps) => {
	return (
		<Link
			href={tab.href}
			className={`${styles.tab} ${isActive ? styles.active : ''}`}
		>
			{tab.label}
		</Link>
	);
};

export default SettingsTab;
