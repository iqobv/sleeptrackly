import { components } from '../../schema';

type SwaggerType = components['schemas']['ChallengeVisibility'];

export const ChallengeVisibility = {
	DRAFT: 'DRAFT',
	PUBLISHED: 'PUBLISHED',
} as const satisfies Record<SwaggerType, SwaggerType>;

export type ChallengeVisibility =
	(typeof ChallengeVisibility)[keyof typeof ChallengeVisibility];
