import ipaddr from 'ipaddr.js';

export const isPrivateIP = (ip: string): boolean => {
	try {
		if (!ip || ip === '::1' || ip === '127.0.0.1') return true;

		const addr = ipaddr.parse(ip);
		const range = addr.range();
		const privateRanges = [
			'loopback',
			'private',
			'uniqueLocal',
			'linkLocal',
			'multicast',
		];

		return privateRanges.includes(range);
	} catch {
		return true;
	}
};
