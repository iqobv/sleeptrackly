'use client';

import { approveQrLogin } from '@/api/auth/qr.api';
import { SectionHeader } from '@shared/ui';
import { useMutation } from '@tanstack/react-query';
import { Scanner } from '@yudiel/react-qr-scanner';
import { useEffect, useState } from 'react';
import styles from './QrScan.module.scss';

export const QrScan = () => {
	const [result, setResult] = useState<string | null>(null);

	const { mutate, isSuccess, error } = useMutation({
		mutationFn: (qrId: string) => approveQrLogin(qrId),
	});

	useEffect(() => {
		if (result) mutate(result);
	}, [result, mutate]);

	return (
		<div className={styles.qrScan}>
			<SectionHeader
				title="Point your camera at the QR code"
				titleProps={{
					variant: 'h3',
				}}
			/>
			{error && <p>Error: {error.message}</p>}
			{isSuccess ? (
				<p>Success! You are logged in. Now you can close this tab.</p>
			) : (
				<Scanner
					sound={false}
					constraints={{
						backgroundBlur: true,
						aspectRatio: 1,
						facingMode: 'environment',
						sampleSize: 0.5,
					}}
					styles={{
						container: {
							maxWidth: 300,
							borderRadius: 10,
							margin: '0 auto',
						},
					}}
					onScan={(scanResult) => setResult(scanResult[0].rawValue)}
				/>
			)}
		</div>
	);
};
