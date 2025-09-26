export const normalizeIp = (ip: string | null) => {
	if (!ip) return null;
	if (ip.startsWith('::ffff:')) return ip.replace('::ffff:', '');
	return ip;
};
