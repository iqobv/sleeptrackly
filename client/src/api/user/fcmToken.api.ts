import { apiClient } from '../axios';

export const saveFcmToken = async (token: string) =>
	(await apiClient.post('/v1/fcm/save-token', { token })).data;

export const checkFcmTokenStatus = async (token: string) =>
	(await apiClient.get<boolean>(`/v1/fcm/exists/${encodeURIComponent(token)}`))
		.data;

export const removeFcmToken = async (token: string) =>
	(await apiClient.delete<boolean>(`/v1/fcm/remove-token/${token}`)).data;
