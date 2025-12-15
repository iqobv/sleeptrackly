'use client';

import { Button, Modal } from '@/components/UI';
import { useState } from 'react';
import { MdOutlineQrCodeScanner } from 'react-icons/md';
import QrScan from './QrScan/QrScan';
import styles from './QrScanModal.module.scss';

const QrScanModal = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<Button variant="text" isIcon isRounded onClick={() => setIsOpen(true)}>
				<MdOutlineQrCodeScanner size={25} />
			</Button>
			<Modal
				containerClassName={styles['qr-scan-modal']}
				isOpen={isOpen}
				bodyClassName={styles['qr-scan-modal__body']}
				onClose={() => setIsOpen(false)}
			>
				<QrScan />
			</Modal>
		</>
	);
};

export default QrScanModal;
