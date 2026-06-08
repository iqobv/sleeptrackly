'use client';

import { KeyboardEvent } from 'react';
import styles from '../Select/SelectItem/SelectItem.module.scss';
import { useMultiSelectContext } from './MultiSelectContext';

interface MultiSelectItemProps extends Omit<
	React.HTMLAttributes<HTMLDivElement>,
	'value'
> {
	value: string;
	children: React.ReactNode;
}

export const MultiSelectItem = ({
	value: itemValue,
	children,
	onClick,
	onKeyDown,
	...props
}: MultiSelectItemProps) => {
	const { onSelect, value } = useMultiSelectContext();
	const isSelected = value.includes(itemValue);

	const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			onSelect(itemValue);
		}
		if (onKeyDown) onKeyDown(e);
	};

	return (
		<div
			role="option"
			tabIndex={0}
			aria-selected={isSelected}
			className={styles.item}
			onClick={(e) => {
				onSelect(itemValue);
				if (onClick) onClick(e);
			}}
			onKeyDown={handleKeyDown}
			{...props}
		>
			{children}
			{isSelected && <div className={styles.itemIndicator} />}
		</div>
	);
};
