'use client';

import { CSSProperties } from 'react';
import styles from './FormActions.module.scss';

interface FormActionsProps {
	children: React.ReactNode;
	className?: string;
	justifyContent?: CSSProperties['justifyContent'];
}

const FormActions = ({
	children,
	className,
	justifyContent = 'start',
}: FormActionsProps) => {
	return (
		<div
			className={`${styles.formActions} ${className || ''}`}
			style={{ justifyContent }}
		>
			{children}
		</div>
	);
};

export default FormActions;
