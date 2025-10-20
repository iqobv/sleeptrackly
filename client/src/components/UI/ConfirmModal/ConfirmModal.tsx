'use client';

import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import SectionHeader from '../SectionHeader/SectionHeader';
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
			<SectionHeader title={title} titleComponent="h2" description={text} />
			<div className={styles['confirm-modal__footer']}>
				<Button variant="outlined" onClick={onCancel}>
					Cancel
				</Button>
				<Button variant="danger" onClick={onConfirm}>
					Confirm
				</Button>
			</div>
		</Modal>
	);
}
