'use client';

import { getQrStatus, initiateQrCode } from '@/api';
import { QUERY_KEYS } from '@/config';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const POLLING_INTERVAL_MS = 3000;

export const useQrCodeModal = () => {
	const router = useRouter();

	const { data, isLoading, error, refetch } = useQuery({
		queryFn: initiateQrCode,
		queryKey: QUERY_KEYS.auth.generateQr,
		staleTime: Infinity,
		gcTime: 0,
	});

	const qrId = data?.qrId;

	useEffect(() => {
		if (!qrId) return;

		const intervalId = setInterval(async () => {
			try {
				const statusData = await getQrStatus(qrId);

				if (statusData.status === 'success') {
					clearInterval(intervalId);
					router.refresh();
				}

				if (statusData.status === 'expired') {
					refetch();
				}
			} catch (e) {
				console.error('Polling error:', e);
			}
		}, POLLING_INTERVAL_MS);

		return () => clearInterval(intervalId);
	}, [qrId, router, refetch]);

	return {
		qrId,
		isLoading,
		error,
	};
};
