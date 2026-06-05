'use client';

import clsx from 'clsx';
import { ComponentPropsWithRef } from 'react';
import styles from './Checkbox.module.scss';

interface CheckboxProps extends ComponentPropsWithRef<'input'> {
	label?: React.ReactNode;
	error?: string;
	isBordered?: boolean;
}

const Checkbox = ({
	label,
	error,
	ref,
	isBordered = false,
	disabled,
	...props
}: CheckboxProps) => {
	const wrapperClass = clsx(
		styles.wrapper,
		isBordered && styles.bordered,
		error && styles.error,
		disabled && styles.disabled,
	);

	return (
		<div className={wrapperClass}>
			<label className={styles.container}>
				<input
					type="checkbox"
					className={styles.input}
					ref={ref}
					disabled={disabled}
					{...props}
				/>
				<span className={styles.label}>{label}</span>
			</label>
		</div>
	);
};

export default Checkbox;
