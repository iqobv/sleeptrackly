'use client';

import { FieldValues, useFormContext } from 'react-hook-form';

import { Button } from '@shared/ui';
import styles from './FormContent.module.scss';

interface FormContentProps {
	buttonLabel?: string;
	isEdit?: boolean;
	children: React.ReactNode;
	isLoading?: boolean;
}

const FormContent = <T extends FieldValues>({
	buttonLabel = 'Save',
	isEdit = false,
	children,
	isLoading,
}: FormContentProps) => {
	const methods = useFormContext<T>();

	const {
		reset,
		formState: { errors, isDirty },
	} = methods;

	return (
		<div className={styles['fields']}>
			{errors.root && <p>{errors.root.message}</p>}
			{children}
			<div className={styles['buttons']}>
				<Button type="submit" disabled={isEdit && !isDirty}>
					{buttonLabel}
				</Button>
				{isEdit && isDirty && (
					<Button
						type="button"
						variant="contained"
						color="secondary"
						disabled={!isDirty}
						onClick={() => reset()}
						loading={isLoading}
					>
						Reset
					</Button>
				)}
			</div>
		</div>
	);
};

export default FormContent;
