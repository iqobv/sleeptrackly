import { components } from '@shared/types';

type SwaggerAcquiredFrom = components['schemas']['AcquiredFrom'];

export const AcquiredFrom = {
	REWARD: 'REWARD',
	ADMIN_GRANT: 'ADMIN_GRANT',
	BUNDLE: 'BUNDLE',
	PROMOTION: 'PROMOTION',
	PURCHASE: 'PURCHASE',
	CHALLENGE_REWARD: 'CHALLENGE_REWARD',
} as const satisfies Record<SwaggerAcquiredFrom, SwaggerAcquiredFrom>;

export type AcquiredFrom = (typeof AcquiredFrom)[keyof typeof AcquiredFrom];
