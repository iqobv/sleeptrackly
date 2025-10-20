'use client';

import { Button } from '@/components/UI';
import styles from './SettingsSecurityField.module.scss';

interface SettingsSecurityFieldProps {
	label: string;
	isImportant?: boolean;
	buttonText?: string;
	action: () => void;
}

const SettingsSecurityField = ({
	label,
	isImportant,
	buttonText,
	action,
}: SettingsSecurityFieldProps) => {
	return (
		<div className={`${styles['settings-security-field']}`}>
			<div className={styles['settings-security-field__label']}>{label}</div>
			<Button
				onClick={action}
				variant={isImportant ? 'danger' : 'outlined'}
				className={styles['settings-security-field__button']}
			>
				{buttonText}
			</Button>
		</div>
	);
};

export default SettingsSecurityField;
