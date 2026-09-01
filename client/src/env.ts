import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	shared: {
		NODE_ENV: z
			.enum(['development', 'production', 'test'])
			.default('development'),
	},
	server: {
		API_URL: z.url().nonempty('API_URL is required'),
	},
	client: {
		NEXT_PUBLIC_CLIENT_URL: z
			.url()
			.nonempty('NEXT_PUBLIC_CLIENT_URL is required'),
		NEXT_PUBLIC_API_URL: z.url().nonempty('NEXT_PUBLIC_API_URL is required'),
		NEXT_PUBLIC_CDN_URL: z.url().nonempty('NEXT_PUBLIC_CDN_URL is required'),
		NEXT_PUBLIC_FIREBASE_API_KEY: z
			.string()
			.nonempty('NEXT_PUBLIC_FIREBASE_API_KEY is required'),
		NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z
			.string()
			.nonempty('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN is required'),
		NEXT_PUBLIC_FIREBASE_PROJECT_ID: z
			.string()
			.nonempty('NEXT_PUBLIC_FIREBASE_PROJECT_ID is required'),
		NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: z
			.string()
			.nonempty('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET is required'),
		NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z
			.string()
			.nonempty('NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID is required'),
		NEXT_PUBLIC_FIREBASE_APP_ID: z
			.string()
			.nonempty('NEXT_PUBLIC_FIREBASE_APP_ID is required'),
		NEXT_PUBLIC_FIREBASE_VAPID_KEY: z
			.string()
			.nonempty('NEXT_PUBLIC_FIREBASE_VAPID_KEY is required'),
		NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: z
			.string()
			.nonempty('NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID is required'),
		NEXT_PUBLIC_GA_MEASUREMENT_ID: z
			.string()
			.nonempty('NEXT_PUBLIC_GA_MEASUREMENT_ID is required'),
		NEXT_PUBLIC_ROOT_DOMAIN: z
			.string()
			.nonempty('NEXT_PUBLIC_ROOT_DOMAIN is required'),
	},
	runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV,
		API_URL: process.env.API_URL,
		NEXT_PUBLIC_CLIENT_URL: process.env.NEXT_PUBLIC_CLIENT_URL,
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
		NEXT_PUBLIC_CDN_URL: process.env.NEXT_PUBLIC_CDN_URL,
		NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
		NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:
			process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
		NEXT_PUBLIC_FIREBASE_PROJECT_ID:
			process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
		NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:
			process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
		NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:
			process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
		NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
		NEXT_PUBLIC_FIREBASE_VAPID_KEY: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
		NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID:
			process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
		NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
		NEXT_PUBLIC_ROOT_DOMAIN: process.env.NEXT_PUBLIC_ROOT_DOMAIN,
	},
});
