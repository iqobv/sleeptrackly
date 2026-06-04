import { getCookieConfig } from '@config';
import { ConfigService } from '@nestjs/config';
import type { Response } from 'express';

export const setAuthCookies = (
	res: Response,
	accessToken: string,
	refreshToken: string,
	config: ConfigService,
): void => {
	const accessTokenOptions = getCookieConfig(config, '15m');
	const refreshTokenOptions = getCookieConfig(config, '30d');

	res.cookie('accessToken', accessToken, accessTokenOptions);
	res.cookie('refreshToken', refreshToken, refreshTokenOptions);
};

export const clearAuthCookies = (
	res: Response,
	config: ConfigService,
): void => {
	const clearOptions = getCookieConfig(config, 0);

	res.cookie('accessToken', '', clearOptions);
	res.cookie('refreshToken', '', clearOptions);
};
