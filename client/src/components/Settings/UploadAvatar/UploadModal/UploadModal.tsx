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
		<Modal
			isOpen={isOpen}
			onClose={handleClose}
			containerClassName={styles['upload-modal__container']}
			bodyClassName={styles['upload-modal']}
		>
			<Image
				src={URL.createObjectURL(file)}
				width={250}
				height={250}
				alt={file.name}
				className={styles['upload-modal__image']}
			/>
			<p className={styles['upload-modal__text']}>
				Are you sure you want to upload this image?
			</p>
			<div className={styles['upload-modal__buttons']}>
				<Button variant="outlined" onClick={handleClose}>
					Cancel
				</Button>
				<Button onClick={handleUpload}>Upload</Button>
			</div>
		</Modal>
	);
};

export default UploadModal;
