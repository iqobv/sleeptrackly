import type { Request } from 'express';
import { ClientInfoDto } from '../dto';

export const extractClientInfo = (req: Request): ClientInfoDto => {
	const forwardedFor = req.headers['x-forwarded-for'] as string | undefined;
	const ip = forwardedFor
		? forwardedFor.split(',')[0].trim()
		: req.socket.remoteAddress || '';
	const userAgent = req.headers['user-agent'] || '';

	return { ip, userAgent };
};
