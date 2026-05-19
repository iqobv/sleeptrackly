'use client';

import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import styles from './ConfirmModal.module.scss';
import { ConfirmModalProps } from './ConfirmModal.types';

export default function ConfirmModal({
	title,
	text,
	isOpen,
	onClose,
	onConfirm,
}: ConfirmModalProps) {
	return (
		<Modal open={isOpen} onOpenChange={onClose}>
			<Modal.Content className={styles.confirmModal}>
				<Modal.Header>{title}</Modal.Header>
				<Modal.Body>
					<p>{text}</p>
				</Modal.Body>
				<Modal.Footer className={styles.footer}>
					<Modal.Close asChild>
						<Button variant="outlined">Cancel</Button>
					</Modal.Close>
					<Button variant="contained" color="danger" onClick={onConfirm}>
						Confirm
					</Button>
				</Modal.Footer>
			</Modal.Content>
		</Modal>
	);
}
