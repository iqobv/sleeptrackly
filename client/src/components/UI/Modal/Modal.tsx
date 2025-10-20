'use client';

import { createPortal } from 'react-dom';
import { MdClose } from 'react-icons/md';
import Button from '../Button/Button';
import styles from './Modal.module.scss';
import { ModalProps } from './Modal.types';
import { useModal } from './useModal';

export default function Modal({
	children,
	isOpen,
	bodyClassName = '',
	containerClassName = '',
	onClose,
}: ModalProps) {
	const { modalRef } = useModal({ isOpen, onClose });

	if (!isOpen) return null;

	return createPortal(
		<div className={styles['modal']}>
			<div
				className={`${styles['modal__container']} ${containerClassName}`}
				ref={modalRef}
				role="dialog"
				aria-modal
			>
				<div className={styles['modal__header']}>
					<Button onClick={onClose} isIcon variant="text">
						<MdClose size={25} />
					</Button>
				</div>
				<div className={`${styles['modal__body']} ${bodyClassName}`}>
					{children}
				</div>
			</div>
		</div>,
		document.body
	);
}
