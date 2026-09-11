import { fcmEnvSchema } from '@config/schemas/fcm.schema';
import { EnvService } from '@infra/env/env.service';
import * as admin from 'firebase-admin';

export const FIREBASE_ADMIN = 'FIREBASE_ADMIN';

export const firebaseAdminProvider = {
	provide: FIREBASE_ADMIN,
	inject: [EnvService],
	useFactory: (envService: EnvService) => {
		const config = envService.getGroup(fcmEnvSchema);

		const projectId = config.FIREBASE_PROJECT_ID;
		const clientEmail = config.FIREBASE_CLIENT_EMAIL;
		const privateKey = config.FIREBASE_PRIVATE_KEY_BASE64;

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
