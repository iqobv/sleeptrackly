import { env } from '@/env';
import { register } from 'firebase/messaging';
import { getFirebaseMessaging } from '../firabase.util';
import { ensureSw } from './ensureSw.util';

export const getFcmToken = async () => {
	const messaging = await getFirebaseMessaging();
	if (!messaging) return null;

	const reg = await ensureSw();
	if (!reg) return null;

	return register(messaging, {
		vapidKey: env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
		serviceWorkerRegistration: reg,
	});
};
