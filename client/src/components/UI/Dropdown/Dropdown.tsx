'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useState } from 'react';
import { DropdownProps } from './Dropdown.types';
import { DropdownContext } from './DropdownContent';
import DropdownContent from './DropdownContent/DropdownContent';
import DropdownItem from './DropdownItem/DropdownItem';
import DropdownSeparator from './DropdownSeparator/DropdownSeparator';

export default function Dropdown({
	children,
	open,
	onOpenChange,
	...props
}: DropdownProps) {
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
}

Dropdown.Trigger = DropdownMenu.Trigger;
Dropdown.Content = DropdownContent;
Dropdown.Item = DropdownItem;
Dropdown.Separator = DropdownSeparator;
