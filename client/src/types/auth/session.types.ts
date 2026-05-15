export interface Session {
	id: string;
	userId: string;
	isCurrent: boolean;
	ipAddress: string | null;
	city: string | null;
	region: string | null;
	countryCode: string | null;
	osName: string | null;
	deviceType: string | null;
	browserName: string | null;
	browserVersion: string | null;
	createdAt: Date;
	updatedAt: Date;
	expiresAt: Date;
	rotatedAt: Date | null;
}
