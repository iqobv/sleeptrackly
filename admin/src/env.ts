import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	server: {
		API_URL: z.url().nonempty('API_URL is required'),
		JWT_SECRET: z.string().nonempty('JWT_SECRET is required'),
	},
	client: {
		NEXT_PUBLIC_API_URL: z.url().nonempty('NEXT_PUBLIC_API_URL is required'),
		NEXT_PUBLIC_CDN_URL: z.url().nonempty('NEXT_PUBLIC_CDN_URL is required'),
		NEXT_PUBLIC_SITE_URL: z.url().nonempty('NEXT_PUBLIC_SITE_URL is required'),
	},
	runtimeEnv: {
		API_URL: process.env.API_URL,
		JWT_SECRET: process.env.JWT_SECRET,
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
		NEXT_PUBLIC_CDN_URL: process.env.NEXT_PUBLIC_CDN_URL,
		NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
	},
});
