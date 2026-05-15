import { UserRole } from '@generated/prisma/enums';

export interface JwtPayload {
	id: string;
	email: string;
	role: UserRole;
	sessionId: string;

	createdAt: Date;
}
