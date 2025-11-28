'use client';

import styles from './SettingsField.module.scss';

interface SettingsFieldProps {
	label: string | React.ReactNode;
	actionElement?: React.ReactNode;
	mobileDirection?: 'row' | 'column';
}

const SettingsField = ({
	label,
	actionElement,
	mobileDirection = 'column',
}: SettingsFieldProps) => {
	return (
		<div
			className={styles['settings-field']}
			style={{ '--mobile-direction': mobileDirection } as React.CSSProperties}
		>
			<div className={styles['settings-field__label']}>{label}</div>
			{actionElement && <>{actionElement}</>}
		</div>
	);
};

export default SettingsField;
