'use client';

import { SectionHeader } from '@/components/UI';
import { QRCodeSVG } from 'qrcode.react';
import { MdOutlineQrCodeScanner, MdOutlineSettings } from 'react-icons/md';
import QrCodeLoader from './QrCodeLoader';
import styles from './QrCodeModal.module.scss';
import { useQrCodeModal } from './useQrCodeModal';

const QrCodeModal = () => {
	const { isLoading, error, qrId } = useQrCodeModal();

	return (
		<div style={{ textAlign: 'center' }}>
			<SectionHeader
				description={
					<>
						Click on your avatar in the top right corner &gt;{' '}
						<b>
							<MdOutlineSettings /> Settings
						</b>{' '}
						&gt; <b>Security</b> &gt; <b>View sessions</b> &gt;{' '}
						<MdOutlineQrCodeScanner />
					</>
				}
			/>
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
