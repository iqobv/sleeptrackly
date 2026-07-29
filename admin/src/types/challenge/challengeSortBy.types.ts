import { components } from '../schema';

type SwaggerType = components['schemas']['ChallengeSortBy'];

export const ChallengeSortBy = {
	availableFrom: 'availableFrom',
	availableTo: 'availableTo',
	createdAt: 'createdAt',
	durationDays: 'durationDays',
} as const satisfies Record<SwaggerType, SwaggerType>;

export type ChallengeSortBy =
	(typeof ChallengeSortBy)[keyof typeof ChallengeSortBy];
