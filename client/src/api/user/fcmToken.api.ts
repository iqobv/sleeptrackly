import { fetcher } from '@/utils';

export const saveFcmToken = async (token: string) =>
	await fetcher('/api/v1/fcm/save-token', {
		method: 'POST',
		body: JSON.stringify({ token }),
	});
