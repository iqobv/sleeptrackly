import { components } from '@shared/types';

type SwaggerType = components['schemas']['ChallengeTemplateSortBy'];

export const ChallengeTemplateSortBy = {
	createdAt: 'createdAt',
} as const satisfies Record<SwaggerType, SwaggerType>;

export type ChallengeTemplateSortBy =
	(typeof ChallengeTemplateSortBy)[keyof typeof ChallengeTemplateSortBy];
