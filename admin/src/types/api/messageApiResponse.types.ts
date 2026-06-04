import { components } from '../schema';

export type MessageApiResponse = components['schemas']['MessageResponseDto'] & {
	statusCode?: number;
};
