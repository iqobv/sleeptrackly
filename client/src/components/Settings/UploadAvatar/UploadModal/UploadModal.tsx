'use client';

import { Button, Modal } from '@/components/UI';
import Image from 'next/image';
import { useEffect, useState } from 'react';

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
		<Modal isOpen={isOpen} onClose={handleClose}>
			<Image
				src={URL.createObjectURL(file)}
				width={200}
				height={200}
				alt={file.name}
			/>
			<p>Are you sure you want to upload this image?</p>
			<p>{file.name}</p>
			<Button onClick={handleClose}>Cancel</Button>
			<Button onClick={handleUpload}>Upload</Button>
		</Modal>
	);
};

export default UploadModal;
