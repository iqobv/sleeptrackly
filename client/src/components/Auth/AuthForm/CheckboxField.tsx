'use client';

import { ComponentPropsWithRef, ReactNode, useId } from 'react';
import styles from './AuthForm.module.scss';

interface CheckboxFieldProps extends ComponentPropsWithRef<'input'> {
	label: ReactNode;
	error?: string;
}

export const CheckboxField = ({
	label,
	error,
	...props
}: CheckboxFieldProps) => {
	const generatedId = useId();
	const id = props.id || generatedId;

	return (
		<div className={styles.field}>
			<div className={styles.checkbox}>
				<input type="checkbox" id={id} {...props} />
				<label htmlFor={id}>{label}</label>
			</div>
			{error && <span className={styles.error}>{error}</span>}
		</div>
	);
};
