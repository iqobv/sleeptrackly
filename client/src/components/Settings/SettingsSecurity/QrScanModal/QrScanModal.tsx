'use client';

import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalTrigger,
} from '@/components/UI';
import { MdOutlineQrCodeScanner } from 'react-icons/md';
import { QrScan } from './QrScan/QrScan';
import styles from './QrScanModal.module.scss';

export const QrScanModal = () => {
	return (
		<Modal>
			<ModalTrigger asChild>
				<Button variant="text" isIcon isRounded>
					<MdOutlineQrCodeScanner size={25} />
				</Button>
			</ModalTrigger>
			<ModalContent className={styles.modal}>
				<ModalHeader>Scan QR code</ModalHeader>
				<ModalBody className={styles.body}>
					<QrScan />
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
