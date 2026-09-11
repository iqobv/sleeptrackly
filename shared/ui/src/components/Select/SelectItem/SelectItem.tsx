'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import clsx from 'clsx';
import type { SelectItemProps } from '../Select.types';
import styles from './SelectItem.module.scss';

export const SelectItem = ({
	children,
	className,
	ref,
	...props
}: SelectItemProps) => {
	return (
		<SelectPrimitive.Item
			ref={ref}
			className={clsx(styles.item, className)}
			{...props}
		>
			<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
			<SelectPrimitive.ItemIndicator className={styles.itemIndicator} />
		</SelectPrimitive.Item>
	);
};
