import { ConfigService } from '@nestjs/config';
import { SessionOptions, Store } from 'express-session';
import { getCookieConfig } from './cookie.config';

export const getSessionConfig = (
	config: ConfigService,
	store: Store,
): SessionOptions => ({
	secret: config.getOrThrow<string>('SESSION_SECRET'),
	name: config.getOrThrow<string>('SESSION_NAME'),
	resave: false,
	saveUninitialized: false,
	cookie: getCookieConfig(config),
	store,
});
