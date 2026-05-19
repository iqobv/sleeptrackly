import { ComponentPropsWithRef } from 'react';

export interface InputProps extends ComponentPropsWithRef<'input'> {
	leftSection?: React.ReactNode;
	rightSection?: React.ReactNode;
	error?: boolean;
	inputClassName?: string;
	inputStyle?: React.CSSProperties;
}
