import { z } from 'zod';

export const appEnvSchema = z.object({
	PORT: z.coerce.number().default(5000),
	NODE_ENV: z
		.enum(['development', 'production', 'test'])
		.default('development'),
	SERVER_URL: z.url().nonempty('SERVER_URL is required'),
	CLIENT_URL: z.url().nonempty('CLIENT_URL is required'),
	ALLOWED_ORIGIN: z
		.string()
		.nonempty('ALLOWED_ORIGIN is required')
		.transform((value) => value.split(',').map((origin) => origin.trim()))
		.pipe(
			z
				.array(z.url('ALLOWED_ORIGIN must be a valid URL'))
				.min(1, 'ALLOWED_ORIGIN must contain at least one valid URL'),
		),
	SENTRY_DNS: z.url().nonempty('SENTRY_DNS is required'),
	SWAGGER_USER: z.string().nonempty('SWAGGER_USER is required'),
	SWAGGER_PASSWORD: z.string().nonempty('SWAGGER_PASSWORD is required'),
});

export type AppConfig = z.infer<typeof appEnvSchema>;
