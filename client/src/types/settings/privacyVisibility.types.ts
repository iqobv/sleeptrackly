import { components } from '@shared/types';

type SwaggerPrivacyVisibility = components['schemas']['Visibility'];

export const PrivacyVisibility = {
	FRIENDS: 'FRIENDS',
	PRIVATE: 'PRIVATE',
	PUBLIC: 'PUBLIC',
} as const satisfies Record<SwaggerPrivacyVisibility, SwaggerPrivacyVisibility>;

export type PrivacyVisibility =
	(typeof PrivacyVisibility)[keyof typeof PrivacyVisibility];
