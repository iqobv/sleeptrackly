'use client';

import { getQrStatus, initiateQrCode } from '@/api';
import { QUERY_KEYS } from '@/config';
import { useQuery } from '@tanstack/react-query';
import { QRCodeSVG } from 'qrcode.react';
import { useEffect } from 'react';

const POLLING_INTERVAL_MS = 3000;

const QrCodeModal = () => {
	const { data, isLoading, error, refetch } = useQuery({
		queryFn: initiateQrCode,
		queryKey: QUERY_KEYS.auth.generateQr,
		staleTime: Infinity,
	});

	const qrId = data?.qrId;

	useEffect(() => {
		if (!qrId) return;

		const intervalId = setInterval(async () => {
			try {
				const statusData = await getQrStatus(qrId);

				if (statusData.status === 'success') {
					clearInterval(intervalId);
					window.location.reload();
				}

				if (statusData.status === 'expired') {
					refetch();
				}
			} catch (e) {
				console.error('Polling error:', e);
			}
		}, POLLING_INTERVAL_MS);

		return () => clearInterval(intervalId);
	}, [qrId, refetch]);

	if (isLoading) {
		return <p>Generating QR code...</p>;
	}

	if (error) {
		return <p style={{ color: 'red' }}>Error: {error.message}</p>;
	}

	return (
		<div style={{ textAlign: 'center', padding: '50px' }}>
			<h1>Login with QR code</h1>
			<p>Scan the QR code with your phone</p>
			<div
				style={{
					margin: '30px',
					height: '256px',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				{qrId ? (
					<QRCodeSVG level="L" value={qrId} size={256} marginSize={3} />
				) : (
					<p>Could not generate QR code</p>
				)}
			</div>
		</div>
	);
};

export default QrCodeModal;
