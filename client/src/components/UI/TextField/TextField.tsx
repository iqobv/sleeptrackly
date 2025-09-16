'use client';

import { useId, useState } from 'react';
import TextareaAutosize, {
	TextareaAutosizeProps,
} from 'react-textarea-autosize';
import { TextFieldProps } from './TextField.types';
import { textFieldVariants } from './textFieldStyles';

import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import Button from '../Button/Button';
import FormLabel from '../FormLabel/FormLabel';
import cssStyles from './TextField.module.scss';
import TextFieldIcon from './TextFieldIcon/TextFieldIcon';

export default function TextField({
	disabled = false,
	fullWidth = false,
	multiline = false,
	className,
	register,
	label,
	error,
	leftIcon,
	rightIcon,
	containerClassName,
	leftIconClassName,
	rightIconClassName,
	...rest
}: TextFieldProps) {
	const generatedId = useId();
	const id = rest.id ?? generatedId;
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const originalType = (rest as React.ComponentProps<'input'>)?.type;
	const isPassword = originalType === 'password';

	const inputType = isPassword && isPasswordVisible ? 'text' : originalType;

	const styles = textFieldVariants({
		fullWidth,
		disabled,
		error: !!error,
		leftIcon: !!leftIcon,
		rightIcon: !!rightIcon || isPassword,
	});

	const handleTogglePassword = () => setIsPasswordVisible((prev) => !prev);

	return (
		<div
			className={`${cssStyles['text-field__container']} ${
				!!fullWidth ? cssStyles['full-width--true'] : ''
			} ${containerClassName || ''}`}
		>
			{!!label && <FormLabel id={id}>{label}</FormLabel>}
			<div
				className={`${cssStyles['text-field__wrapper']} ${
					disabled ? cssStyles['disabled'] : ''
				} ${!!error && !disabled ? cssStyles['error'] : ''} ${className || ''}`}
			>
				{!!leftIcon && (
					<TextFieldIcon
						id={id}
						className={`${cssStyles['icon--left']} ${leftIconClassName}`}
					>
						{leftIcon}
					</TextFieldIcon>
				)}
				{multiline ? (
					<TextareaAutosize
						className={styles}
						id={id}
						{...register}
						{...(rest as TextareaAutosizeProps)}
					/>
				) : (
					<input
						className={styles}
						id={id}
						disabled={disabled}
						{...register}
						{...(rest as React.ComponentProps<'input'>)}
						type={inputType}
					/>
				)}
				{!!rightIcon && (
					<TextFieldIcon
						id={id}
						className={`${cssStyles['icon--right']} ${rightIconClassName}`}
					>
						{rightIcon}
					</TextFieldIcon>
				)}
				{isPassword && (
					<TextFieldIcon
						id={id}
						className={`${cssStyles['icon--right']} ${rightIconClassName}`}
					>
						<Button
							variant="text"
							onClick={handleTogglePassword}
							isIcon
							size="sm"
						>
							{isPasswordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
						</Button>
					</TextFieldIcon>
				)}
			</div>
			{error && !disabled && (
				<p className={cssStyles['error__text']}>{error}</p>
			)}
		</div>
	);
}
