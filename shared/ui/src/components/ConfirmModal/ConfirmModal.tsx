'use client';

import { Button } from '../Button/Button';
import { Modal, ModalClose, ModalTrigger } from '../Modal/Modal';
import { ModalContent } from '../Modal/ModalContent/ModalContent';
import { ModalBody } from '../Modal/ModalParts/ModalBody';
import { ModalFooter } from '../Modal/ModalParts/ModalFooter';
import { ModalHeader } from '../Modal/ModalParts/ModalHeader';
import styles from './ConfirmModal.module.scss';
import { ConfirmModalProps } from './ConfirmModal.types';

export const ConfirmModal = ({
	children,
	title,
	text,
	onConfirm,
}: ConfirmModalProps) => {
	return (
		<Modal>
			<ModalTrigger asChild>{children}</ModalTrigger>
			<ModalContent className={styles.confirmModal}>
				<ModalHeader>{title}</ModalHeader>
				<ModalBody>{text}</ModalBody>
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
