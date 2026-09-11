import { components } from '../../schema';

type SwaggerType = components['schemas']['ChallengeTaskStatus'];

export const ChallengeTaskStatus = {
	COMPLETED: 'COMPLETED',
	FAILED: 'FAILED',
	PENDING: 'PENDING',
	RECOVERED: 'RECOVERED',
} as const satisfies Record<SwaggerType, SwaggerType>;

export type ChallengeTaskStatus =
	(typeof ChallengeTaskStatus)[keyof typeof ChallengeTaskStatus];
