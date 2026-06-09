'use client';

import { Typography } from '@shared/ui';
import { QRCodeSVG } from 'qrcode.react';
import { MdOutlineQrCodeScanner, MdOutlineSettings } from 'react-icons/md';
import QrCodeLoader from './QrCodeLoader';
import styles from './QrCodeModal.module.scss';
import { useQrCodeModal } from './useQrCodeModal';

const QrCodeModal = () => {
	const { isLoading, error, qrId } = useQrCodeModal();

	return (
		<div style={{ textAlign: 'center' }}>
			<Typography variant="body1">
				<>
					Click on your avatar in the top right corner &gt;{' '}
					<b>
						<MdOutlineSettings /> Settings
					</b>{' '}
					&gt; <b>Security</b> &gt; <b>View sessions</b> &gt;{' '}
					<MdOutlineQrCodeScanner />
				</>
			</Typography>
			<div className={styles.container}>
				{isLoading && <QrCodeLoader />}
				{error && <p>Error: {error.message}</p>}
				{qrId && (
					<QRCodeSVG
						level="L"
						value={qrId}
						size={256}
						marginSize={3}
						style={{
							borderRadius: 8,
						}}
					/>
				)}
			</div>
		</div>
	);
};

export default QrCodeModal;
