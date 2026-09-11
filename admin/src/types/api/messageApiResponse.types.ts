import { components } from '@shared/types';

export type MessageApiResponse = components['schemas']['MessageResponseDto'] & {
	statusCode?: number;
};
