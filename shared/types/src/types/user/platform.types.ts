import { components } from '../../schema';

type SwaggerType = components['schemas']['Platform'];

export const Platform = {
	ANDROID: 'ANDROID',
	IOS: 'IOS',
	WEB: 'WEB',
} as const satisfies Record<SwaggerType, SwaggerType>;

export type Platform = (typeof Platform)[keyof typeof Platform];
