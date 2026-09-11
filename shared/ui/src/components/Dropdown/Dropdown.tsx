'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useState } from 'react';
import { DropdownProps } from './Dropdown.types';
import { DropdownContext } from './DropdownContext';

export const Dropdown = ({
	children,
	open,
	onOpenChange,
	...props
}: DropdownProps) => {
	const [internalOpen, setInternalOpen] = useState(false);
	const isOpen = open !== undefined ? open : internalOpen;
	const setIsOpen = onOpenChange !== undefined ? onOpenChange : setInternalOpen;

	return (
		<DropdownContext.Provider value={{ isOpen }}>
			<DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen} {...props}>
				{children}
			</DropdownMenu.Root>
		</DropdownContext.Provider>
	);
};

export const DropdownTrigger = DropdownMenu.Trigger;
