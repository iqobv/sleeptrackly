import { RefObject } from 'react';

export interface MultiSelectProps {
	children: React.ReactNode;
	value: string[];
	onChange: (value: string[]) => void;
}

export interface MultiSelectContextType {
	value: string[];
	onSelect: (itemValue: string) => void;
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	triggerRef: RefObject<HTMLButtonElement | null>;
}
