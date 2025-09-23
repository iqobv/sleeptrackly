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
		<div
			className={`${styles['settings-security-field']} ${
				isImportant ? styles['settings-security-field--important'] : ''
			}`}
		>
			<div className={styles['settings-security-field__label']}>{label}</div>
			<Button
				onClick={action}
				variant="outlined"
				className={styles['settings-security-field__button']}
			>
				{buttonText}
			</Button>
		</div>
	);
};

export default SettingsSecurityField;
