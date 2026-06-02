import { components } from '../schema';

type SwaggerFrequency = components['schemas']['ChallengeDto']['frequency'];

export const ChallengeFrequency: Record<SwaggerFrequency, SwaggerFrequency> = {
	DAILY: 'DAILY',
	WEEKLY: 'WEEKLY',
	MONTHLY: 'MONTHLY',
	ONCE: 'ONCE',
} as const;

export type ChallengeFrequency =
	(typeof ChallengeFrequency)[keyof typeof ChallengeFrequency];
