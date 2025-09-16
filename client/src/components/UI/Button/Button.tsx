'use client';

import Link from 'next/link';
import { buttonVariants } from './butonStyles';
import { ButtonProps } from './Button.types';

export default function Button({
	children,
	variant = 'contained',
	className = '',
	disabled = false,
	href = '',
	id,
	onClick = () => {},
	style,
	type = 'button',
	loading = false,
	size = 'md',
	fullWidth = false,
	isIcon = false,
	...rest
}: ButtonProps) {
	const isLink = !!href && !disabled && !loading;

	const styles = buttonVariants({ variant, size, fullWidth, isIcon, disabled });

	return (
		<>
			{isLink ? (
				<Link
					href={href}
					className={`${styles} ${className}`}
					style={style}
					{...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
				>
					{children}
				</Link>
			) : (
				<button
					className={`${styles} ${className}`}
					onClick={onClick}
					style={style}
					disabled={disabled || loading}
					type={type}
					{...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
				>
					{children}
				</button>
			)}
		</>
	);
}
