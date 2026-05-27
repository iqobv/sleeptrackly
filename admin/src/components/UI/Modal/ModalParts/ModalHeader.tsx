'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { MdClose } from 'react-icons/md';
import { Button } from '../../Button';
import { ModalPartProps } from './ModalPart.types';
import styles from './ModalParts.module.scss';

export const ModalHeader = ({ children, className = '' }: ModalPartProps) => {
	return (
		<Dialog.Title className={`${styles.header} ${className}`}>
			<div>{children}</div>
			<Dialog.Close asChild>
				<Button variant="text" size="sm" isIcon isRounded>
					<MdClose size={16} />
				</Button>
			</Dialog.Close>
		</Dialog.Title>
	);
};
