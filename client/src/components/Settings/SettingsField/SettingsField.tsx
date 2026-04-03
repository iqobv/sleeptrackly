'use client';

import styles from './SettingsField.module.scss';

export type MobileDirection = 'row' | 'column';
interface SettingsFieldProps {
	label: string | React.ReactNode;
	children?: React.ReactNode;
	mobileDirection?: MobileDirection;
}

const SettingsField = ({
	label,
	children,
	mobileDirection = 'column',
}: SettingsFieldProps) => {
	return (
		<div
			className={styles['settings-field']}
			style={{ '--mobile-direction': mobileDirection } as React.CSSProperties}
		>
			<div className={styles['settings-field__label']}>{label}</div>
			{children && <>{children}</>}
		</div>
	);
};

export default SettingsField;
