import { ConfigService } from '@nestjs/config';
import { RedisStore } from 'connect-redis';
import { SessionOptions } from 'express-session';
import { createClient } from 'redis';
import { getCookieConfig } from './cookie.config';

export const getSessionConfig = (
	config: ConfigService,
	redisClient: ReturnType<typeof createClient>,
): SessionOptions => ({
	secret: config.getOrThrow<string>('SESSION_SECRET'),
	name: config.getOrThrow<string>('SESSION_NAME'),
	resave: false,
	saveUninitialized: false,
	cookie: getCookieConfig(config),
	store: new RedisStore({ client: redisClient }),
});
