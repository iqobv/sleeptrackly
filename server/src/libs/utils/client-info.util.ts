import { ClientInfoDto } from '@libs/dto/client-info.dto';
import type { Request } from 'express';

export const extractClientInfo = (req: Request): ClientInfoDto => {
	const userAgent = req.headers['user-agent'] || '';

	const cfIp = req.headers['cf-connecting-ip'];
	if (cfIp && typeof cfIp === 'string') {
		return {
			ip: cfIp.split(',')[0].trim(),
			userAgent,
		};
	}

	const forwardedFor = req.headers['x-forwarded-for'];
	if (forwardedFor && typeof forwardedFor === 'string') {
		return {
			ip: forwardedFor.split(',')[0].trim(),
			userAgent,
		};
	}

	return {
		ip: req.socket.remoteAddress || '',
		userAgent,
	};
};
