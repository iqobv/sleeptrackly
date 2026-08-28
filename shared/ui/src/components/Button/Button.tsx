'use client';

import { Slot, Slottable } from '@radix-ui/react-slot';
import clsx from 'clsx';
import React from 'react';
import { Loader } from '../Loader/Loader';
import { ButtonProps } from './Button.types';
import { ButtonContent } from './ButtonContent/ButtonContent';
import { buttonVariants } from './buttonVariants';
import styles from './styles/Button.module.scss';

export const Button = ({
	children,
	variant = 'contained',
	color = 'primary',
	className = '',
	disabled = false,
	type = 'button',
	loading = false,
	size = 'md',
	fullWidth = false,
	isIcon = false,
	isRounded = false,
	ref,
	asChild = false,
	onClick,
	textTransform = 'none',
	...props
}: ButtonProps) => {
	const isDisabled = disabled || loading;
	const Component = asChild ? Slot : 'button';

	const classNames = buttonVariants({
		variant,
		color,
		size,
		fullWidth,
		isIcon,
		disabled: isDisabled,
		isRounded,
		textTransform,
	});

	const handleClick = (e: React.MouseEvent<HTMLElement>) => {
		if (isDisabled) {
			e.preventDefault();
			return;
		}
		onClick?.(e);
	};

	return (
		<Component
			ref={ref}
			className={clsx(classNames, className)}
			disabled={asChild ? undefined : isDisabled}
			aria-disabled={isDisabled}
			data-loading={loading ? '' : undefined}
			type={asChild ? undefined : type}
			onClick={handleClick}
			{...props}
		>
			{loading && (
				<Loader
					disablePadding
					size={22}
					thickness={4}
					containerClassName={styles.loader}
				/>
			)}
			<Slottable>{ButtonContent({ children, loading, asChild })}</Slottable>
		</Component>
	);
};
