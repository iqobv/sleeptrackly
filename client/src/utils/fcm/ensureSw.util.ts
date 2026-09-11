import { FIREBASE_CONFIG } from '@/config/firebase.config';

export const ensureSw = async (): Promise<ServiceWorkerRegistration | null> => {
	if (typeof window === 'undefined' || !('serviceWorker' in navigator))
		return null;

	const cleanConfig = Object.entries(FIREBASE_CONFIG).reduce(
		(acc, [key, value]) => {
			if (value !== undefined) {
				acc[key] = value;
			}
			return acc;
		},
		{} as Record<string, string>,
	);

	const params = new URLSearchParams(cleanConfig).toString();
	const swUrl = `/firebase-messaging-sw.js?${params}`;

	const reg = await navigator.serviceWorker.register(swUrl);

	if (reg.active) return reg;

	await navigator.serviceWorker.ready;

	return (await navigator.serviceWorker.getRegistration()) ?? reg;
};
