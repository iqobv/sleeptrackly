import { components } from '../schema';

type SwaggerFrequency = components['schemas']['ChallengeFrequency'];

export const ChallengeFrequency = {
	DAILY: 'DAILY',
	WEEKLY: 'WEEKLY',
	MONTHLY: 'MONTHLY',
	ONCE: 'ONCE',
} as const satisfies Record<SwaggerFrequency, SwaggerFrequency>;

export type ChallengeFrequency =
	(typeof ChallengeFrequency)[keyof typeof ChallengeFrequency];
