import { fetcher } from '@/utils';

export const saveFcmToken = async (token: string) =>
	await fetcher(
		'/api/v1/fcm/save-token',
		{
			method: 'POST',
			body: JSON.stringify({ token }),
		},
		true
	);

export const checkFcmTokenStatus = async (token: string) =>
	await fetcher<boolean>(
		`/api/v1/fcm/exists/${encodeURIComponent(token)}`,
		{},
		true
	);

export const removeFcmToken = async (token: string) =>
	await fetcher(
		'/api/v1/fcm/remove-token',
		{
			method: 'DELETE',
			body: JSON.stringify({ token }),
		},
		true
	);
