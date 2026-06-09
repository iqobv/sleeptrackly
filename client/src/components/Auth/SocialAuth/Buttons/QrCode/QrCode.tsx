'use client';

import {
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalTrigger,
} from '@shared/ui';
import { MdOutlineQrCode2 } from 'react-icons/md';
import SocialButton from '../../SocialButton/SocialButton';
import styles from './QrCode.module.scss';
import QrCodeModal from './QrCodeModal/QrCodeModal';

const QrCode = () => {
	return (
		<Modal>
			<ModalTrigger asChild>
				<SocialButton>
					<MdOutlineQrCode2 />
					<span>QR Code</span>
				</SocialButton>
			</ModalTrigger>
			<ModalContent className={styles.qrCodeModal}>
				<ModalHeader>Login with QR code</ModalHeader>
				<ModalBody>
					<QrCodeModal />
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default QrCode;
