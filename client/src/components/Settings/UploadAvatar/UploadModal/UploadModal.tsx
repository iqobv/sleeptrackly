'use client';

import {
	Button,
	Modal,
	ModalBody,
	ModalClose,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from '@shared/ui';
import Image from 'next/image';
import { useState } from 'react';

import styles from './UploadModal.module.scss';

interface UploadModalProps {
	file: File;
	handleClear: () => void;
	handleUpdate: () => void;
}

export const UploadModal = ({
	file,
	handleClear,
	handleUpdate,
}: UploadModalProps) => {
	const [isOpen, setIsOpen] = useState(() => Boolean(file));

	const handleClose = () => {
		setIsOpen(false);
		handleClear();
	};

	const handleUpload = () => {
		setIsOpen(false);
		handleUpdate();
	};

	return (
		<Modal open={isOpen} onOpenChange={handleClose}>
			<ModalContent className={styles.content}>
				<ModalHeader>Upload Avatar</ModalHeader>
				<ModalBody className={styles.body}>
					<Image
						src={URL.createObjectURL(file)}
						width={250}
						height={250}
						alt={file.name}
						className={styles.image}
					/>
					<p className={styles.text}>
						Are you sure you want to upload this image?
					</p>
				</ModalBody>
				<ModalFooter className={styles.footer}>
					<ModalClose asChild>
						<Button variant="outlined">Cancel</Button>
					</ModalClose>
					<Button onClick={handleUpload}>Upload</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
