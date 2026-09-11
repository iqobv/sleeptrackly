'use client';

import * as Popover from '@radix-ui/react-popover';
import { useRef, useState } from 'react';
import type { MultiSelectProps } from './MultiSelect.types';
import { MultiSelectContext } from './MultiSelectContext';

export const MultiSelect = ({
	children,
	value,
	onChange,
}: MultiSelectProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const triggerRef = useRef<HTMLButtonElement>(null);

	const handleSelect = (itemValue: string) => {
		const nextValues = value.includes(itemValue)
			? value.filter((v) => v !== itemValue)
			: [...value, itemValue];
		onChange(nextValues);
	};

	return (
		<MultiSelectContext.Provider
			value={{
				value,
				onSelect: handleSelect,
				isOpen,
				setIsOpen,
				triggerRef,
			}}
		>
			<Popover.Root open={isOpen} onOpenChange={setIsOpen} modal>
				{children}
			</Popover.Root>
		</MultiSelectContext.Provider>
	);
};
