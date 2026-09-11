import { paths } from '../../schema';

export type User =
	paths['/v1/auth/me']['get']['responses']['200']['content']['application/json'];
