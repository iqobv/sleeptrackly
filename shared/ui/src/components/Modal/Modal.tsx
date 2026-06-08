'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { ModalProps } from './Modal.types';
import { ModalContext } from './ModalContext';

export const Modal = ({
	children,
	open,
	onOpenChange,
	...props
}: ModalProps) => {
	const [internalOpen, setInternalOpen] = useState(false);
	const isOpen = open !== undefined ? open : internalOpen;
	const setIsOpen = onOpenChange !== undefined ? onOpenChange : setInternalOpen;

	return (
		<ModalContext.Provider value={{ isOpen }}>
			<Dialog.Root open={isOpen} onOpenChange={setIsOpen} {...props}>
				{children}
			</Dialog.Root>
		</ModalContext.Provider>
	);
};

export const ModalTrigger = Dialog.Trigger;
export const ModalClose = Dialog.Close;
