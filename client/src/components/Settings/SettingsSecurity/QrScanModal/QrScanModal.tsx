'use client';

import { Button, Modal } from '@/components/UI';
import { MdOutlineQrCodeScanner } from 'react-icons/md';
import QrScan from './QrScan/QrScan';
import styles from './QrScanModal.module.scss';

const QrScanModal = () => {
	return (
		<Modal>
			<Modal.Trigger asChild>
				<Button variant="text" isIcon isRounded>
					<MdOutlineQrCodeScanner size={25} />
				</Button>
			</Modal.Trigger>
			<Modal.Content className={styles.modal}>
				<Modal.Header>Scan QR code</Modal.Header>
				<Modal.Body className={styles.body}>
					<QrScan />
				</Modal.Body>
			</Modal.Content>
		</Modal>
	);
};

export default QrScanModal;
