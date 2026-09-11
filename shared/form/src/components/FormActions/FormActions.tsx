'use client';

import clsx from 'clsx';
import styles from './FormActions.module.scss';
import { FormActionsProps } from './FormActions.types';

export const FormActions = ({
	children,
	className,
	justifyContent = 'start',
	style,
}: FormActionsProps) => {
	return (
		<div
			className={clsx(styles.formActions, className)}
			style={{ justifyContent, ...style }}
		>
			{children}
		</div>
	);
};
