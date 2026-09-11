'use client';

import { MobileDirection } from '@/types/settings/settingsField.types';
import styles from './SettingsField.module.scss';

interface SettingsFieldProps {
	label: string | React.ReactNode;
	children?: React.ReactNode;
	mobileDirection?: MobileDirection;
}

export const SettingsField = ({
	label,
	children,
	mobileDirection = 'column',
}: SettingsFieldProps) => {
	return (
		<div
			className={styles.field}
			style={{ '--mobile-direction': mobileDirection } as React.CSSProperties}
		>
			<div className={styles.label}>{label}</div>
			{children && <>{children}</>}
		</div>
	);
};
