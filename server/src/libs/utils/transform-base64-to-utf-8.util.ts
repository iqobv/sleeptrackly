export const transformBase64ToUtf8 = (base64String: string): string =>
	Buffer.from(base64String, 'base64').toString('utf-8');
