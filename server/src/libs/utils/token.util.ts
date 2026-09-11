import crypto from 'crypto';

export const generateRawToken = (): string =>
	crypto.randomBytes(64).toString('hex');

export const hashToken = (token: string): string =>
	crypto.createHash('sha256').update(token).digest('hex');
