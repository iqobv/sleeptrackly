'use client';

import { ComponentPropsWithRef, ReactNode, useId } from 'react';
import styles from './AuthForm.module.scss';

interface CheckboxFieldProps extends ComponentPropsWithRef<'input'> {
	label: ReactNode;
	error?: string;
}

const CheckboxField = ({ label, error, ...props }: CheckboxFieldProps) => {
	const generatedId = useId();
	const id = props.id || generatedId;

	return (
		<div className={styles['auth-form__field']}>
			<div className={styles['auth-form__checkbox']}>
				<input type="checkbox" id={id} {...props} />
				<label htmlFor={id}>{label}</label>
			</div>
			{error && <span className={styles['auth-form__error']}>{error}</span>}
		</div>
	);
};

export default CheckboxField;
