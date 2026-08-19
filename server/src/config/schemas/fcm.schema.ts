import { transformBase64ToUtf8 } from '@libs/utils/transform-base64-to-utf-8.util';
import { z } from 'zod';

export const fcmEnvSchema = z.object({
	FIREBASE_PROJECT_ID: z.string().nonempty('FIREBASE_PROJECT_ID is required'),
	FIREBASE_CLIENT_EMAIL: z
		.string()
		.nonempty('FIREBASE_CLIENT_EMAIL is required'),
	FIREBASE_ICON_URL: z.string().nonempty('FIREBASE_ICON_URL is required'),
	FIREBASE_PRIVATE_KEY_BASE64: z
		.base64()
		.nonempty('FIREBASE_PRIVATE_KEY_BASE64 is required')
		.transform((key) => transformBase64ToUtf8(key)),
});

export type FcmConfig = z.infer<typeof fcmEnvSchema>;
