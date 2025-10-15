'use client';

import { approveQrLogin } from '@/api';
import { QUERY_KEYS } from '@/config';
import { useMutation } from '@tanstack/react-query';
import { Scanner } from '@yudiel/react-qr-scanner';
import { useEffect, useState } from 'react';

const QrScan = () => {
	const [result, setResult] = useState<string | null>(null);

	const { mutate, isSuccess, error } = useMutation({
		mutationFn: (qrId: string) => approveQrLogin(qrId),
		mutationKey: QUERY_KEYS.auth.approveQrLogin,
	});

	useEffect(() => {
		if (result) {
			mutate(result);
		}
	}, [result, mutate]);

	if (isSuccess) {
		return <p>Success! You are logged in. Now you can close this tab.</p>;
	}
	if (error) {
		return <p>Error: {error.message}</p>;
	}

	return (
		<div>
			<p>Scan the QR code with your phone</p>
			<Scanner onScan={(scanResult) => setResult(scanResult[0].rawValue)} />
		</div>
	);
};

export default QrScan;
