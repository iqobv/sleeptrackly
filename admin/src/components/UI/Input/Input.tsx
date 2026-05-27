'use client';

import { MouseEvent, useRef, useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { mergeRefs } from 'react-merge-refs';
import { Button } from '../Button';
import { useField } from '../Field/FieldContext';
import styles from './Input.module.scss';
import { InputProps } from './Input.types';

export const Input = ({
	className = '',
	error,
	disabled,
	leftSection,
	rightSection,
	type = 'text',
	ref,
	required,
	id,
	inputClassName = '',
	style,
	inputStyle,
	wrapperRef,
	wrapperProps,
	value,
	...props
}: InputProps) => {
	const field = useField({ id, error, disabled, required });

	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const internalRef = useRef<HTMLInputElement>(null);

	const classNames = [
		styles.container,
		field.error && styles.error,
		field.disabled && styles.disabled,
		className,
	]
		.filter(Boolean)
		.join(' ');

	const isPasswordType = type === 'password';

	const actualType = isPasswordType && isPasswordVisible ? 'text' : type;

	const handleSectionClick = (event: MouseEvent<HTMLDivElement>) => {
		const target = event.target as HTMLElement;
		if (!target.closest('button')) {
			internalRef.current?.focus();
		}
	};

	const handleTogglePassword = () => setIsPasswordVisible((prev) => !prev);

	const finalRightSection =
		rightSection === undefined && isPasswordType ? (
			<Button
				type="button"
				disabled={disabled}
				onClick={handleTogglePassword}
				className={styles.passwordToggle}
				variant="text"
				size="sm"
				isRounded
				isIcon
			>
				{isPasswordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
			</Button>
		) : (
			rightSection
		);

	return (
		<div
			ref={wrapperRef}
			className={classNames}
			data-has-left={!!leftSection}
			data-has-right={!!finalRightSection}
			style={style}
			{...wrapperProps}
		>
			{leftSection && (
				<div className={styles.section} onClick={handleSectionClick}>
					{leftSection}
				</div>
			)}
			<input
				ref={mergeRefs([ref, internalRef])}
				type={actualType}
				disabled={field.disabled}
				className={`${styles.input} ${inputClassName}`}
				required={field.required}
				id={field.id}
				style={inputStyle}
				value={value ?? ''}
				{...props}
			/>
			{finalRightSection && (
				<div className={styles.section} onClick={handleSectionClick}>
					{finalRightSection}
				</div>
			)}
		</div>
	);
};
