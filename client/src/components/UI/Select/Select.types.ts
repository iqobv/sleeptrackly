import { RefObject } from 'react';

export type SelectValue = string | string[];

export interface SelectProps {
	children: React.ReactNode;
	value?: SelectValue;
	onChange: (value: SelectValue) => void;
	multiple?: boolean;
}

export interface SelectContextType {
	value: SelectValue | undefined;
	onSelect: (itemValue: string) => void;
	multiple: boolean;
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	triggerRef: RefObject<HTMLElement | null>;
}
