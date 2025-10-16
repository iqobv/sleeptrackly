'use client';

import QrCodeModal from '@/components/Auth/SocialAuth/Buttons/QrCode/QrCodeModal/QrCodeModal';
import { Modal } from '@/components/UI';
import { useState } from 'react';
import { MdOutlineQrCode2 } from 'react-icons/md';
import SocialButton from '../../SocialButton/SocialButton';
import styles from './QrCode.module.scss';

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
				<Modal
					containerClassName={styles['qr-code-modal']}
					isOpen={open}
					onClose={handleModal}
				>
					<QrCodeModal />
				</Modal>
			)}
		</>
	);
};

export default QrCode;
