import { paths } from '@shared/types';
import { apiClient } from '../axios';

type SaveFcmTokenResponse =
	paths['/v1/fcm/save-token']['post']['responses']['201']['content']['application/json'];
type CheckFcmTokenStatusResponse =
	paths['/v1/fcm/exists/{token}']['get']['responses']['200']['content']['application/json'];
type RemoveFcmTokenResponse =
	paths['/v1/fcm/remove-token/{token}']['delete']['responses']['200']['content']['application/json'];

export const saveFcmToken = async (token: string) =>
	(await apiClient.post<SaveFcmTokenResponse>('/v1/fcm/save-token', { token }))
		.data;

export const checkFcmTokenStatus = async (token: string) =>
	(
		await apiClient.get<CheckFcmTokenStatusResponse>(
			`/v1/fcm/exists/${encodeURIComponent(token)}`,
		)
	).data;

export const removeFcmToken = async (token: string) =>
	(
		await apiClient.delete<RemoveFcmTokenResponse>(
			`/v1/fcm/remove-token/${token}`,
		)
	).data;
