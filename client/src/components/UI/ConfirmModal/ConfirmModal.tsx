'use client';

import { Button } from '../Button';
import {
	Modal,
	ModalBody,
	ModalClose,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from '../Modal';
import styles from './ConfirmModal.module.scss';
import { ConfirmModalProps } from './ConfirmModal.types';

export const ConfirmModal = ({
	title,
	text,
	isOpen,
	onClose,
	onConfirm,
}: ConfirmModalProps) => {
	return (
		<Modal open={isOpen} onOpenChange={onClose}>
			<ModalContent className={styles.confirmModal}>
				<ModalHeader>{title}</ModalHeader>
				<ModalBody>
					<p>{text}</p>
				</ModalBody>
				<ModalFooter className={styles.footer}>
					<ModalClose asChild>
						<Button variant="outlined">Cancel</Button>
					</ModalClose>
					<Button variant="contained" color="danger" onClick={onConfirm}>
						Confirm
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
