import { type ReactNode } from 'react';

export interface DropdownProps {
	children: ReactNode;
	buttonRef: React.RefObject<HTMLDivElement> | null;
	isOpen: boolean;
	onClose: () => void;
	width?: number;
	className?: string;
}
