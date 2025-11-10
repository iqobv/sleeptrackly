'use client';

import { FormLabelProps } from './FormLabel.types';

import styles from './FormLabel.module.scss';

export default function FormLabel({ id, children }: FormLabelProps) {
	return (
		<label htmlFor={id} className={styles['form-label']}>
			{children}
		</label>
	);
}
