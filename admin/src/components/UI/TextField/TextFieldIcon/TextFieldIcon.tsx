'use client';

import { PropsWithChildren } from 'react';

interface TextFieldIconProps {
	id: string;
	className?: string;
}

import styles from './TextFieldIcon.module.scss';

const TextFieldIcon = ({
	id,
	className,
	children,
}: PropsWithChildren<TextFieldIconProps>) => {
	return (
		<label htmlFor={id} className={`${styles['icon']} ${className}`}>
			{children}
		</label>
	);
};

export default TextFieldIcon;
