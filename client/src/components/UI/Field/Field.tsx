'use client';

import { useId } from 'react';
import FormLabel from '../FormLabel/FormLabel';
import styles from './Field.module.scss';
import { FieldProps } from './Field.types';
import { FieldContext } from './FieldContext';

const Field = ({
	children,
	className,
	error,
	label,
	required,
	id,
	disabled,
}: FieldProps) => {
	const generatedId = useId();
	const finalId = id ?? generatedId;

	const classNames = [styles.field, className].filter(Boolean).join(' ');

	return (
		<FieldContext.Provider
			value={{ id: finalId, error: !!error, required, disabled }}
		>
			<div className={classNames}>
				{label && (
					<FormLabel required={required} id={finalId} disabled={disabled}>
						{label}
					</FormLabel>
				)}
				<div>{children}</div>
				{error && (
					<span
						className={[styles.error, disabled && styles.disabled]
							.filter(Boolean)
							.join(' ')}
					>
						{error}
					</span>
				)}
			</div>
		</FieldContext.Provider>
	);
};

export default Field;
