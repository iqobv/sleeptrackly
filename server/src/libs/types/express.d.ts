import { JwtPayload } from './jwt-payload.types';

declare module 'express' {
	export interface Request {
		user?: JwtPayload;
	}
}
