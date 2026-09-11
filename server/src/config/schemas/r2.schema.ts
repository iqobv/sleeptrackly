import { z } from 'zod';

export const r2EnvSchema = z.object({
	CLOUDFLARE_ACCOUNT_ID: z
		.string()
		.nonempty('CLOUDFLARE_ACCOUNT_ID is required'),
	CLOUDFLARE_S3_API: z.string().nonempty('CLOUDFLARE_S3_API is required'),
	CLOUDFLARE_API_KEY: z.string().nonempty('CLOUDFLARE_API_KEY is required'),
	CLOUDFLARE_ACCESS_KEY_ID: z
		.string()
		.nonempty('CLOUDFLARE_ACCESS_KEY_ID is required'),
	CLOUDFLARE_ACCESS_SECRET_KEY: z
		.string()
		.nonempty('CLOUDFLARE_ACCESS_SECRET_KEY is required'),
	R2_BUCKET_NAME: z.string().nonempty('R2_BUCKET_NAME is required'),
});

export type R2Config = z.infer<typeof r2EnvSchema>;
