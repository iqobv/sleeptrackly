'use client';

import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import styles from './ConfirmModal.module.scss';
import { ConfirmModalProps } from './ConfirmModal.types';

export default function ConfirmModal({
	title,
	text,
	isOpen,
	onCancel,
	onClose,
	onConfirm,
}: ConfirmModalProps) {
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			containerClassName={styles['confirm-modal']}
		>
			{!!title && (
				<div className={styles['confirm-modal__header']}>{title}</div>
			)}
			<div className={styles['confirm-modal__body']}>{text}</div>
			<div className={styles['confirm-modal__footer']}>
				<Button variant="outlined" onClick={onCancel}>
					Cancel
				</Button>
				<Button onClick={onConfirm}>Confirm</Button>
			</div>
		</Modal>
	);
}
