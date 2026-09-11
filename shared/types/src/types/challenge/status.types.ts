import { components } from '../../schema';

type SwaggerType = components['schemas']['ChallengeStatus'];

export const ChallengeStatus = {
	ACTIVE: 'ACTIVE',
	FROZEN: 'FROZEN',
	COMPLETED: 'COMPLETED',
	EXPIRED: 'EXPIRED',
	FAILED: 'FAILED',
} as const satisfies Record<SwaggerType, SwaggerType>;

export type ChallengeStatus =
	(typeof ChallengeStatus)[keyof typeof ChallengeStatus];
