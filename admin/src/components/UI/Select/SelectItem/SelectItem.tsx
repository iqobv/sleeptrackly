'use client';

import { KeyboardEvent } from 'react';
import { useSelectContext } from '../SelectContext';
import styles from './SelectItem.module.scss';

interface SelectItemProps extends Omit<
	React.HTMLAttributes<HTMLDivElement>,
	'value'
> {
	value: string;
	children: React.ReactNode;
}

export const SelectItem = ({
	value: itemValue,
	children,
	onClick,
	onKeyDown,
	...props
}: SelectItemProps) => {
	const { multiple, onSelect, value } = useSelectContext();

	const isSelected = multiple
		? Array.isArray(value) && value.includes(itemValue)
		: value === itemValue;

	const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			onSelect(itemValue);
		}

		if (onKeyDown) {
			onKeyDown(e);
		}
	};

	return (
		<div
			role="option"
			tabIndex={0}
			aria-selected={isSelected}
			className={styles.item}
			data-selected={isSelected ? '' : undefined}
			onClick={(e) => {
				onSelect(itemValue);
				if (onClick) onClick(e);
			}}
			onKeyDown={handleKeyDown}
			{...props}
		>
			{children}
		</div>
	);
};
