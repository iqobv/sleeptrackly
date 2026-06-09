'use client';

import clsx from 'clsx';
import styles from './FormLabel.module.scss';
import { FormLabelProps } from './FormLabel.types';

export const FormLabel = ({
	id,
	children,
	required,
	className,
	disabled,
}: FormLabelProps) => {
	const classNames = clsx(
		styles.label,
		required && styles.required,
		disabled && styles.disabled,
		className,
	);

	return (
		<label htmlFor={id} className={classNames}>
			{children}
		</label>
	);
};
