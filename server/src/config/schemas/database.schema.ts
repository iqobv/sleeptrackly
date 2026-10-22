import { z } from 'zod';

export const databaseEnvSchema = z.object({
	POSTGRES_URI: z.string().nonempty('POSTGRES_URI is required'),
	POSTGRES_DB: z.string().nonempty('POSTGRES_DB is required'),
	POSTGRES_HOST: z.string().nonempty('POSTGRES_HOST is required'),
	POSTGRES_PASSWORD: z.string().nonempty('POSTGRES_PASSWORD is required'),
	POSTGRES_PORT: z.coerce.number().int().positive(),
	POSTGRES_USER: z.string().nonempty('POSTGRES_USER is required'),
});

export type DatabaseConfig = z.infer<typeof databaseEnvSchema>;
