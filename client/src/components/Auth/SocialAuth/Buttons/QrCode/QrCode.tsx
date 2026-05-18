'use client';

import { Modal } from '@/components/UI';
import { MdOutlineQrCode2 } from 'react-icons/md';
import SocialButton from '../../SocialButton/SocialButton';
import styles from './QrCode.module.scss';
import QrCodeModal from './QrCodeModal/QrCodeModal';

const QrCode = () => {
	return (
		<Modal>
			<Modal.Trigger asChild>
				<SocialButton>
					<MdOutlineQrCode2 />
					<span>QR Code</span>
				</SocialButton>
			</Modal.Trigger>
			<Modal.Content className={styles.qrCodeModal}>
				<Modal.Header>Login with QR code</Modal.Header>
				<Modal.Body>
					<QrCodeModal />
				</Modal.Body>
			</Modal.Content>
		</Modal>
	);
};

export default QrCode;
