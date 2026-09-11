import { components } from '../../../schema';

type SwaggerItemRarity = components['schemas']['ItemRarity'];

export const ItemRarity = {
	COMMON: 'COMMON',
	UNCOMMON: 'UNCOMMON',
	RARE: 'RARE',
	EPIC: 'EPIC',
	LEGENDARY: 'LEGENDARY',
	MYTHIC: 'MYTHIC',
} as const satisfies Record<SwaggerItemRarity, SwaggerItemRarity>;

export type ItemRarity = (typeof ItemRarity)[keyof typeof ItemRarity];
