import { env } from '@/env';
import { onRegistered, register } from 'firebase/messaging';
import { getFirebaseMessaging } from '../firabase.util';
import { ensureSw } from './ensureSw.util';

export const getFcmToken = async (): Promise<string | null> => {
	try {
		const messaging = await getFirebaseMessaging();

		if (!messaging) {
			return null;
		}

		const reg = await ensureSw();

		if (!reg) {
			return null;
		}

		const tokenPromise = new Promise<string>((resolve, reject) => {
			const unsubscribe = onRegistered(messaging, (token: string) => {
				unsubscribe();
				resolve(token);
			});

			register(messaging, {
				vapidKey: env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
				serviceWorkerRegistration: reg,
			}).catch((error) => {
				unsubscribe();
				reject(error);
			});
		});

		return await tokenPromise;
	} catch (error) {
		console.error(error);
		return null;
	}
};
