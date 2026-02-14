'use client';

import { FieldValues, useFormContext } from 'react-hook-form';

import { Button } from '@/components/UI';
import styles from './FormContent.module.scss';

interface FormContentProps {
	buttonLabel?: string;
	isEdit?: boolean;
	children: React.ReactNode;
}

const FormContent = <T extends FieldValues>({
	buttonLabel = 'Save',
	isEdit = false,
	children,
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
						variant="secondary"
						disabled={!isDirty}
						onClick={() => reset()}
					>
						Reset
					</Button>
				)}
			</div>
		</div>
	);
};

export default FormContent;
