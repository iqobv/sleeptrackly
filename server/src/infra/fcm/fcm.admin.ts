import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

export const FIREBASE_ADMIN = 'FIREBASE_ADMIN';

export const firebaseAdminProvider = {
	provide: FIREBASE_ADMIN,
	inject: [ConfigService],
	useFactory: (cfg: ConfigService) => {
		const projectId = cfg.get<string>('FIREBASE_PROJECT_ID');
		const clientEmail = cfg.get<string>('FIREBASE_CLIENT_EMAIL');
		const privateKey = cfg
			.get<string>('FIREBASE_PRIVATE_KEY')
			?.replace(/\\n/g, '\n');

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
