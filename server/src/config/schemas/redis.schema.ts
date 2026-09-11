import { z } from 'zod';

export const redisEnvSchema = z.object({
	REDIS_HOST: z.string().nonempty('REDIS_HOST id required'),
	REDIS_PORT: z.coerce.number().int().positive('REDIS_PORT is required'),
	REDIS_PASSWORD: z.string().nonempty('REDIS_PASSWORD is required'),
});

export type RedisConfig = z.infer<typeof redisEnvSchema>;
