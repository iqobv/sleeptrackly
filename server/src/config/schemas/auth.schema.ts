import { z } from 'zod';

const envBoolean = (
	defaultValue: boolean,
): z.ZodDefault<z.ZodPreprocess<z.ZodBoolean>> =>
	z
		.preprocess((val) => {
			if (typeof val === 'string') return val === 'true';
			if (typeof val === 'boolean') return val;
			return defaultValue;
		}, z.boolean())
		.default(defaultValue);

export const authEnvSchema = z.object({
	COOKIE_DOMAIN: z.string().nonempty('COOKIE_DOMAIN is required'),
	COOKIE_HTTP_ONLY: envBoolean(true),
	COOKIE_SECURE: envBoolean(true),
	COOKIE_SAME_SITE: z.enum(['strict', 'lax', 'none']).default('strict'),
	JWT_ACCESS_SECRET: z.string().nonempty('JWT_ACCESS_SECRET is required'),
	REFRESH_TOKEN_SECRET: z.string().nonempty('REFRESH_TOKEN_SECRET is required'),
	GOOGLE_CLIENT_ID: z.string().nonempty('GOOGLE_CLIENT_ID is required'),
	GOOGLE_CLIENT_SECRET: z.string().nonempty('GOOGLE_CLIENT_SECRET is required'),
	GOOGLE_REDIRECT: z.string().nonempty('GOOGLE_REDIRECT is required'),
	GOOGLE_REDIRECT_ORIGIN: z
		.string()
		.nonempty('GOOGLE_REDIRECT_ORIGIN is required'),
	OAUTH_REDIRECT_ORIGIN: z
		.string()
		.nonempty('OAUTH_REDIRECT_ORIGIN is required'),
});

export type AuthConfig = z.infer<typeof authEnvSchema>;
