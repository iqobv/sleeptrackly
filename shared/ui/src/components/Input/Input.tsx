'use client';

import clsx from 'clsx';
import { MouseEvent, useRef, useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { mergeRefs } from 'react-merge-refs';
import { Button } from '../Button/Button';
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
	hidden,
	...props
}: InputProps) => {
	const isHidden = hidden || type === 'hidden';

	const field = useField({
		id,
		error,
		disabled,
		required,
		hidden: isHidden,
	});

	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const internalRef = useRef<HTMLInputElement>(null);

	const classNames = clsx(
		styles.container,
		field.error && styles.error,
		field.disabled && styles.disabled,
		field.hidden && styles.hidden,
		className,
	);

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
				className={clsx(styles.input, inputClassName)}
				required={field.required}
				id={field.id}
				style={inputStyle}
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
