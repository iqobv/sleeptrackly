import { User } from 'generated/prisma/client';

declare module 'express' {
	export interface Request {
		user?: User;
	}
}
