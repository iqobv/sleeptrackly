'use client';

import { FormLabelProps } from './FormLabel.types';

import styles from './FormLabel.module.scss';

export const FormLabel = ({
	id,
	children,
	required,
	className,
	disabled,
}: FormLabelProps) => {
	const classNames = [
		styles.label,
		required && styles.required,
		disabled && styles.disabled,
		className,
	]
		.filter(Boolean)
		.join(' ');

	return (
		<label htmlFor={id} className={classNames}>
			{children}
		</label>
	);
};
