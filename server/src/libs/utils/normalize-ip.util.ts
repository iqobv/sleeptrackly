import { isPrivateIP } from './is-private.ip.util';

export const normalizeIp = (ip: string | string[] | null): string | null => {
	if (!ip) return null;

	const currentIp = Array.isArray(ip) ? ip[0] : ip;

	if (isPrivateIP(currentIp)) return null;

	if (currentIp === '::1' || currentIp === '127.0.0.1') return null;

	if (currentIp.startsWith('::ffff:')) return currentIp.replace('::ffff:', '');

	return currentIp;
};
