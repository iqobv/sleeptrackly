'use client';

import { FormActions, FormReset, FormSubmit } from '@shared/form';
import { Typography } from '@shared/ui';
import { FieldValues, useFormContext } from 'react-hook-form';
import styles from './FormContent.module.scss';

interface FormContentProps {
	buttonLabel?: string;
	isEdit?: boolean;
	children: React.ReactNode;
	isLoading?: boolean;
}

export const FormContent = <T extends FieldValues>({
	buttonLabel = 'Save',
	isEdit = false,
	children,
	isLoading = false,
}: FormContentProps) => {
	const {
		formState: { errors },
	} = useFormContext<T>();

	return (
		<div className={styles.fields}>
			{errors.root && (
				<Typography color="error">{errors.root.message}</Typography>
			)}
			{children}
			<FormActions className={styles.buttons}>
				{isEdit && (
					<FormReset disabledOnEmpty buttonProps={{ loading: isLoading }}>
						Reset
					</FormReset>
				)}
				<FormSubmit disabledOnEmpty buttonProps={{ loading: isLoading }}>
					{buttonLabel}
				</FormSubmit>
			</FormActions>
		</div>
	);
};
