import { components } from '@shared/types';

type SwaggerItemType = components['schemas']['ProfileItemType'];

export const ItemType = {
	AVATAR: 'AVATAR',
	AVATAR_FRAME: 'AVATAR_FRAME',
	ANIMATED_AVATAR: 'ANIMATED_AVATAR',
	BACKGROUND_IMAGE: 'BACKGROUND_IMAGE',
	MINI_BACKGROUND_IMAGE: 'MINI_BACKGROUND_IMAGE',
	BADGE: 'BADGE',
} as const satisfies Record<SwaggerItemType, SwaggerItemType>;

export type ItemType = (typeof ItemType)[keyof typeof ItemType];
