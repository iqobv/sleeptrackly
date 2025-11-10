import { UseFormRegisterReturn } from 'react-hook-form';
import { TextareaAutosizeProps } from 'react-textarea-autosize';

export interface BaseTextProps {
	className?: string;
	disabled?: boolean;
	fullWidth?: boolean;
	register?: UseFormRegisterReturn;
	label?: string;
	error?: string;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	containerClassName?: string;
	leftIconClassName?: string;
	rightIconClassName?: string;
}

export interface TextAreaProps
	extends Omit<TextareaAutosizeProps, keyof BaseTextProps>,
		BaseTextProps {
	multiline?: boolean;
}

export interface InputProps
	extends Omit<React.ComponentProps<'input'>, keyof BaseTextProps>,
		BaseTextProps {
	multiline?: never;
}

export type TextFieldProps = InputProps | TextAreaProps;
