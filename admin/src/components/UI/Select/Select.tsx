'use client';

import * as Popover from '@radix-ui/react-popover';
import { useRef, useState } from 'react';
import { SelectProps } from './Select.types';
import SelectContent from './SelectContent/SelectContent';
import { SelectContext } from './SelectContext';
import SelectItem from './SelectItem/SelectItem';
import SelectTrigger from './SelectTrigger/SelectTrigger';

const Select = ({
	children,
	value,
	onChange,
	multiple = false,
}: SelectProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const triggerRef = useRef<HTMLElement>(null);

	const handleSelect = (itemValue: string) => {
		if (multiple) {
			const currentValues = Array.isArray(value) ? value : [];
			const nextValues = currentValues.includes(itemValue)
				? currentValues.filter((v) => v !== itemValue)
				: [...currentValues, itemValue];
			onChange(nextValues);
		} else {
			onChange(itemValue);
			setIsOpen(false);
		}
	};

	return (
		<SelectContext.Provider
			value={{
				value,
				onSelect: handleSelect,
				multiple,
				isOpen,
				setIsOpen,
				triggerRef,
			}}
		>
			<Popover.Root open={isOpen} onOpenChange={setIsOpen} modal>
				{children}
			</Popover.Root>
		</SelectContext.Provider>
	);
};

Select.Trigger = SelectTrigger;
Select.Content = SelectContent;
Select.Item = SelectItem;

export default Select;
