import { IS_PROD_ENV } from '@libs/utils/is-dev.util';
import { transformBase64ToUtf8 } from '@libs/utils/transform-base64-to-utf-8.util';
import { z } from 'zod';

export const databaseEnvSchema = z.object({
	POSTGRES_URI: z.string().nonempty('POSTGRES_URI is required'),
	POSTGRES_DB: z.string().nonempty('POSTGRES_DB is required'),
	POSTGRES_HOST: z.string().nonempty('POSTGRES_HOST is required'),
	POSTGRES_PASSWORD: z.string().nonempty('POSTGRES_PASSWORD is required'),
	POSTGRES_PORT: z.coerce.number().int().positive(),
	POSTGRES_USER: z.string().nonempty('POSTGRES_USER is required'),
	DB_CA_CERT_BASE64: IS_PROD_ENV
		? z
				.base64()
				.min(1, 'DB_CA_CERT_BASE64 is required in production')
				.transform((cert) => transformBase64ToUtf8(cert))
		: z
				.string()
				.optional()
				.transform((cert) => (cert ? transformBase64ToUtf8(cert) : undefined)),
});

export type DatabaseConfig = z.infer<typeof databaseEnvSchema>;
