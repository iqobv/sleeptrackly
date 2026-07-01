'use client';

import * as Dialog from '@radix-ui/react-dialog';
import clsx from 'clsx';
import { MdClose } from 'react-icons/md';
import { Button } from '../../Button/Button';
import { ModalPartProps } from './ModalPart.types';
import styles from './ModalParts.module.scss';

type ModalHeaderProps = Partial<ModalPartProps>;

export const ModalHeader = ({ children, className = '' }: ModalHeaderProps) => {
	return (
		<Dialog.Title className={clsx(styles.header, className)}>
			<div>{children}</div>
			<Dialog.Close asChild>
				<Button variant="text" size="sm" isIcon isRounded>
					<MdClose size={16} />
				</Button>
			</Dialog.Close>
		</Dialog.Title>
	);
};
