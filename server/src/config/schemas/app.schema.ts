import { z } from 'zod';

export const appEnvSchema = z.object({
	PORT: z.coerce.number().default(5000),
	NODE_ENV: z
		.enum(['development', 'production', 'test'])
		.default('development'),
	MAIN_URL: z.url().nonempty('MAIN_URL is required'),
	APP_URL: z.url().nonempty('APP_URL is required'),
	ADMIN_URL: z.url().nonempty('ADMIN_URL is required'),
	SENTRY_DSN: z.url().nonempty('SENTRY_DSN is required'),
	SWAGGER_USER: z.string().nonempty('SWAGGER_USER is required'),
	SWAGGER_PASSWORD: z.string().nonempty('SWAGGER_PASSWORD is required'),
});

export type AppConfig = z.infer<typeof appEnvSchema>;
