import * as Dialog from '@radix-ui/react-dialog';

export interface ModalProps extends Dialog.DialogProps {
	children: React.ReactNode;
}

export interface ModalContextType {
	isOpen: boolean;
}
