import { fetcher } from '@/utils';

export const initiateQrCode = async () =>
	await fetcher<{ qrId: string }>('/api/v1/auth/qr/initiate');

export const approveQrLogin = async (qrId: string) =>
	await fetcher<{ message: string }>('/api/v1/auth/qr/approve', {
		method: 'POST',
		body: JSON.stringify({ qrId }),
	});

export const getQrStatus = async (qrId: string) =>
	await fetcher<{ status: string }>(`/api/v1/auth/qr/status?qrId=${qrId}`);
