export const extractClientIP = (
	ip: string | string[] | null,
): null | string => {
	if (!ip) return null;
	if (Array.isArray(ip)) return ip[0];
	return ip.split(',')[0].trim();
};
