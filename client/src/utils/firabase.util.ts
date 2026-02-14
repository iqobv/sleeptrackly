import { FIREBASE_CONFIG } from '@/config';
import { getApps, initializeApp } from 'firebase/app';
import { getMessaging, isSupported, Messaging } from 'firebase/messaging';

export async function getFirebaseMessaging(): Promise<Messaging | null> {
	if (typeof window === 'undefined') return null;

	const supported = await isSupported();
	if (!supported) return null;

	const app = getApps().length ? getApps()[0] : initializeApp(FIREBASE_CONFIG);

	return getMessaging(app);
}
