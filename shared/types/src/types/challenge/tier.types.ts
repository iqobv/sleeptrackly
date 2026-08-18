import { components } from '../../schema';

type SwaggerType = components['schemas']['ChallengeTier'];

export const ChallengeTier = {
	TIER_1: 'TIER_1',
	TIER_2: 'TIER_2',
	TIER_3: 'TIER_3',
	TIER_4: 'TIER_4',
} as const satisfies Record<SwaggerType, SwaggerType>;

export type ChallengeTier = (typeof ChallengeTier)[keyof typeof ChallengeTier];
