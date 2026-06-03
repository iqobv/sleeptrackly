import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type QrStatusResponse =
	paths['/v1/auth/qr/initiate']['get']['responses']['200']['content']['application/json'];
type ApproveQrLoginRequest =
	paths['/v1/auth/qr/approve']['post']['responses']['200']['content']['application/json'];
type GetQrStatusResponse =
	paths['/v1/auth/qr/status']['get']['responses']['200']['content']['application/json'];

export const initiateQrCode = async () =>
	(await apiClient.get<QrStatusResponse>('/v1/auth/qr/initiate')).data;

export const approveQrLogin = async (qrId: string) =>
	(await apiClient.post<ApproveQrLoginRequest>('/v1/auth/qr/approve', { qrId }))
		.data;

export const getQrStatus = async (qrId: string) =>
	(await apiClient.get<GetQrStatusResponse>(`/v1/auth/qr/status?qrId=${qrId}`))
		.data;
