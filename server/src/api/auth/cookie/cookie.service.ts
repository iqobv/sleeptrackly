import { authEnvSchema } from '@config/schemas/auth.schema';
import { EnvService } from '@infra/env/env.service';
import { Injectable } from '@nestjs/common';
import { CookieOptions, Response } from 'express';
import ms, { StringValue } from 'ms';

@Injectable()
export class CookieService {
	constructor(private readonly envService: EnvService) {}

	private getCookieOptions(maxAge: StringValue | number): CookieOptions {
		const config = this.envService.getGroup(authEnvSchema);

		const domain =
			config.COOKIE_DOMAIN === 'localhost' ? undefined : config.COOKIE_DOMAIN;

		return {
			domain,
			maxAge: typeof maxAge === 'string' ? ms(maxAge) : maxAge,
			httpOnly: config.COOKIE_HTTP_ONLY,
			secure: config.COOKIE_SECURE,
			sameSite: config.COOKIE_SAME_SITE,
		};
	}

	public setAuthCookies(
		res: Response,
		accessToken: string,
		refreshToken: string,
	): void {
		const accessTokenOptions = this.getCookieOptions('15m');
		const refreshTokenOptions = this.getCookieOptions('30d');

		res.cookie('accessToken', accessToken, accessTokenOptions);
		res.cookie('refreshToken', refreshToken, refreshTokenOptions);
	}

	public clearAuthCookies(res: Response): void {
		const clearOptions = this.getCookieOptions(0);

		res.cookie('accessToken', '', clearOptions);
		res.cookie('refreshToken', '', clearOptions);
	}
}
