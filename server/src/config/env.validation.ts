import { appEnvSchema } from '@config/schemas/app.schema';
import { databaseEnvSchema } from '@config/schemas/database.schema';
import { fcmEnvSchema } from '@config/schemas/fcm.schema';
import { r2EnvSchema } from '@config/schemas/r2.schema';
import { redisEnvSchema } from '@config/schemas/redis.schema';
import { smtpEnvSchema } from '@config/schemas/smtp.schema';
import { z } from 'zod';
import { authEnvSchema } from './schemas/auth.schema';

export const rootEnvSchema = z.object({
	...appEnvSchema.shape,
	...databaseEnvSchema.shape,
	...redisEnvSchema.shape,
	...fcmEnvSchema.shape,
	...r2EnvSchema.shape,
	...smtpEnvSchema.shape,
	...authEnvSchema.shape,
});

export type Environment = z.infer<typeof rootEnvSchema>;

export const validate = (env: Record<string, unknown>): Environment => {
	const result = rootEnvSchema.safeParse(env);

	if (!result.success) {
		console.error('Invalid environment variables:');
		console.error(z.prettifyError(result.error));
		process.exit(1);
	}

	return result.data;
};
