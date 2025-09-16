import { ConfigService } from '@nestjs/config';
import { CookieOptions } from 'express';
import ms from 'ms';

import { parseBoolean } from 'src/libs/utils';

export const getCookieConfig = (config: ConfigService): CookieOptions => {
	const maxAge = config.getOrThrow<string>('SESSION_MAX_AGE') as ms.StringValue;

	return {
		// domain: config.getOrThrow<string>('SESSION_DOMAIN'),
		maxAge: ms(maxAge),
		httpOnly: parseBoolean(config.getOrThrow<string>('SESSION_HTTP_ONLY')),
		secure: parseBoolean(config.getOrThrow<string>('SESSION_SECURE')),
		sameSite: config.getOrThrow<string>('SESSION_SAME_SITE') as
			| 'lax'
			| 'strict'
			| 'none',
	};
};
