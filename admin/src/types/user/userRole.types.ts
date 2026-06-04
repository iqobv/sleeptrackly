import { components } from '../schema';

type SwaggerUserRole = components['schemas']['UserRole'];

export const UserRole = {
	USER: 'USER',
	ADMIN: 'ADMIN',
} as const satisfies Record<SwaggerUserRole, SwaggerUserRole>;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];
