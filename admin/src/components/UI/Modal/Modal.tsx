'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { ModalProps } from './Modal.types';
import ModalContent from './ModalContent/ModalContent';
import { ModalContext } from './ModalContext';
import { ModalBody, ModalFooter, ModalHeader } from './ModalParts';

export default function Modal({
	children,
	open,
	onOpenChange,
	...props
}: ModalProps) {
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
}

Modal.Trigger = Dialog.Trigger;
Modal.Close = Dialog.Close;
Modal.Content = ModalContent;
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
