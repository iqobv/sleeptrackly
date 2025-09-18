'use client';

import { useBlockScroll } from '@/hooks';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { MdClose } from 'react-icons/md';
import Button from '../Button/Button';
import styles from './Modal.module.scss';
import { ModalProps } from './Modal.types';

export default function Modal({ children, isOpen, onClose }: ModalProps) {
	const modalRef = useRef<HTMLInputElement>(null);
	useBlockScroll(isOpen);

	const handleClickOutside = (e: MouseEvent) => {
		if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
			onClose();
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	}, []);

	if (!isOpen) return null;

	return createPortal(
		<div className={styles['modal']}>
			<div className={styles['modal__container']} ref={modalRef}>
				<div className={styles['modal__header']}>
					<Button onClick={onClose} isIcon variant="text">
						<MdClose size={25} />
					</Button>
				</div>
				<div className={styles['modal__body']}>{children}</div>
			</div>
		</div>,
		document.body
	);
}
