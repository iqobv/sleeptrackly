'use client';

import { Modal } from '@/components/UI';
import { useState } from 'react';
import { MdOutlineQrCode2 } from 'react-icons/md';
import QrCodeModal from '../../QrCodeModal/QrCodeModal';
import SocialButton from '../SocialButton/SocialButton';

const QrCode = () => {
	const [open, setOpen] = useState(false);
	const handleModal = () => setOpen(!open);

	return (
		<>
			<SocialButton onClick={handleModal}>
				<MdOutlineQrCode2 />
				<span>QR Code</span>
			</SocialButton>
			{open && (
				<Modal isOpen={open} onClose={handleModal}>
					<QrCodeModal />
				</Modal>
			)}
		</>
	);
};

export default QrCode;
