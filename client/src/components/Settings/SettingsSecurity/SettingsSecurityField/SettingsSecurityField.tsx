'use client';

import { Button } from '@/components/UI';
import { SettingsField } from '../../SettingsField/SettingsField';
import styles from './SettingsSecurityField.module.scss';

interface SettingsSecurityFieldProps {
	label: string;
	isImportant?: boolean;
	buttonText?: string;
	action: () => void;
}

export const SettingsSecurityField = ({
	label,
	isImportant,
	buttonText,
	action,
}: SettingsSecurityFieldProps) => {
	return (
		<SettingsField label={label}>
			<Button
				onClick={action}
				variant="outlined"
				color={isImportant ? 'danger' : 'primary'}
				className={styles.button}
			>
				{buttonText}
			</Button>
		</SettingsField>
	);
};
