'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import clsx from 'clsx';
import { MdArrowDropUp } from 'react-icons/md';
import { SelectTriggerProps } from '../Select.types';
import styles from './SelectTrigger.module.scss';

export const SelectTrigger = ({
	children,
	placeholder,
	className,
	ref,
	...props
}: SelectTriggerProps) => {
	return (
		<SelectPrimitive.Trigger
			ref={ref}
			className={clsx(styles.trigger, className)}
			{...props}
		>
			{children || <SelectPrimitive.Value placeholder={placeholder} />}
			<MdArrowDropUp size={26} className={styles.icon} />
		</SelectPrimitive.Trigger>
	);
};
