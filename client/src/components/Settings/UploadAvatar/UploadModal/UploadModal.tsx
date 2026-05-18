'use client';

import { Button, Modal } from '@/components/UI';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import styles from './UploadModal.module.scss';

interface UploadModalProps {
	file: File;
	handleClear: () => void;
	handleUpdate: () => void;
}

const UploadModal = ({ file, handleClear, handleUpdate }: UploadModalProps) => {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		if (file) setIsOpen(true);
	}, [file]);

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
			<Modal.Content className={styles.content}>
				<Modal.Header>Upload Avatar</Modal.Header>
				<Modal.Body className={styles.body}>
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
				</Modal.Body>
				<Modal.Footer className={styles.footer}>
					<Modal.Close asChild>
						<Button variant="outlined">Cancel</Button>
					</Modal.Close>
					<Button onClick={handleUpload}>Upload</Button>
				</Modal.Footer>
			</Modal.Content>
		</Modal>
	);
};

export default UploadModal;
