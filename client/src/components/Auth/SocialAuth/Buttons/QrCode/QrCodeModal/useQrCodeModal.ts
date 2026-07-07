'use client';

import { getQrStatus, initiateQrCode } from '@/api/auth/qr.api';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

interface QrSseSignalPayload {
	status: 'expired' | 'approved';
}

export const useQrCodeModal = () => {
	const router = useRouter();

	const { data, isLoading, error, refetch } = useQuery({
		queryFn: initiateQrCode,
		queryKey: QUERY_KEYS.auth.generateQr(),
		staleTime: Infinity,
		gcTime: 0,
	});

	const { mutate } = useMutation({
		mutationFn: (qrId: string) => getQrStatus(qrId),
		onSuccess: (statusData) => {
			if (statusData.status === 'success') {
				router.refresh();
			}

			if (statusData.status === 'expired') {
				refetch();
			}
		},
		onError: (e) => {
			toast.error(
				e.message || 'An error occurred while checking QR code status',
			);
		},
	});

	const qrId = data?.qrId;
	const expiresAt = data?.expiresAt;

	useEffect(() => {
		if (!qrId || !expiresAt) return;

		const timeUntilExpiration = new Date(expiresAt).getTime() - Date.now();

		const expirationTimer = setTimeout(
			() => {
				refetch();
			},
			Math.max(0, timeUntilExpiration),
		);

		const eventSource = new EventSource(
			`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/qr/stream?qrId=${qrId}`,
		);

		eventSource.addEventListener(
			'qr_status_signal',
			(event: MessageEvent<string>) => {
				const payload = JSON.parse(event.data) as QrSseSignalPayload;

				if (payload.status === 'expired') {
					refetch();
				}

				if (payload.status === 'approved') {
					mutate(qrId);
				}
			},
		);

		eventSource.addEventListener('error', () => {
			eventSource.close();
		});

		return () => {
			clearTimeout(expirationTimer);
			eventSource.close();
		};
	}, [qrId, expiresAt, mutate, refetch]);

	return {
		qrId,
		isLoading,
		error,
	};
};
