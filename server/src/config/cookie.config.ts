import { AuthConfig } from '@config/schemas/auth.schema';
import { CookieOptions } from 'express';
import ms, { StringValue } from 'ms';

export const getCookieConfig = (
	config: AuthConfig,
	maxAge: StringValue | number,
): CookieOptions => {
	return {
		domain: config.COOKIE_DOMAIN,
		maxAge: typeof maxAge === 'string' ? ms(maxAge) : maxAge,
		httpOnly: config.COOKIE_HTTP_ONLY,
		secure: config.COOKIE_SECURE,
		sameSite: config.COOKIE_SAME_SITE,
	};
};
