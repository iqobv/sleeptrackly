import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

export const FIREBASE_ADMIN = 'FIREBASE_ADMIN';

export const firebaseAdminProvider = {
	provide: FIREBASE_ADMIN,
	inject: [ConfigService],
	useFactory: (cfg: ConfigService) => {
		const projectId = cfg.getOrThrow<string>('FIREBASE_PROJECT_ID');
		const clientEmail = cfg.getOrThrow<string>('FIREBASE_CLIENT_EMAIL');
		const encodedPrivateKey = cfg.getOrThrow<string>(
			'FIREBASE_PRIVATE_KEY_BASE64',
		);

		const privateKey = Buffer.from(encodedPrivateKey, 'base64').toString(
			'utf-8',
		);

		if (!admin.apps.length) {
			admin.initializeApp({
				credential: admin.credential.cert({
					projectId,
					clientEmail,
					privateKey,
				}),
			});
		}

		return admin;
	},
};
