export interface ISession {
	id: string;
	userId: string;
	expiresAt: Date;
	ipAddress: string | null;
	userAgent: string | null;
	city: string | null;
	region: string | null;
	country: string | null;
	countryCode: string | null;
	deviceType: string | null;
	browserName: string | null;
	browserVersion: string | null;
	current: boolean;
}
