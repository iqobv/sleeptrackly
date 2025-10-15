'use client';

import QrScan from '@/components/Auth/QrScan/QrScan';
import { Button, Modal } from '@/components/UI';
import { useState } from 'react';

const QrScanModal = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div>
			<Button onClick={() => setIsOpen(true)}>Scan QR code</Button>
			<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
				<QrScan />
			</Modal>
		</div>
	);
};

export default QrScanModal;
