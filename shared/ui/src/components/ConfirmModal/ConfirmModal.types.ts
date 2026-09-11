import { ReactNode } from 'react';

export interface ConfirmModalProps {
	children: ReactNode;
	title: ReactNode | string;
	text: ReactNode | string;
	onConfirm: () => void;
}
