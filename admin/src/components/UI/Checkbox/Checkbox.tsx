'use client';

import { useId } from 'react';

import styles from './Checkbox.module.scss';

interface CheckoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
}

export const Checkbox = ({ label, ...rest }: CheckoxProps) => {
	const generatedId = useId();
	const id = rest.id ?? generatedId;

	return (
		<div className={styles.checkbox}>
			<input type="checkbox" id={id} {...rest} />
			{label && <label htmlFor={id}>{label}</label>}
		</div>
	);
};
