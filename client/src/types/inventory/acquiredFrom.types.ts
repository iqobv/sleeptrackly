import { components } from '../schema';

type SwaggerAcquiredFrom = components['schemas']['AcquiredFrom'];

export const AcquiredFrom = {
	REWARD: 'REWARD',
	ADMIN_GRANT: 'ADMIN_GRANT',
	BUNDLE: 'BUNDLE',
	PROMOTION: 'PROMOTION',
	PURCHASE: 'PURCHASE',
} as const satisfies Record<SwaggerAcquiredFrom, SwaggerAcquiredFrom>;

export type AcquiredFrom = (typeof AcquiredFrom)[keyof typeof AcquiredFrom];
