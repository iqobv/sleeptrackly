import { apiClient } from '../axios';

export const initiateQrCode = async () =>
	(await apiClient.get<{ qrId: string }>('/v1/auth/qr/initiate')).data;

export const approveQrLogin = async (qrId: string) =>
	(await apiClient.post<{ message: string }>('/v1/auth/qr/approve', { qrId }))
		.data;

export const getQrStatus = async (qrId: string) =>
	(await apiClient.get<{ status: string }>(`/v1/auth/qr/status?qrId=${qrId}`))
		.data;
