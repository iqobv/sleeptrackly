import { components } from '../../schema';

type SwaggerType = components['schemas']['ChallengeType'];

export const ChallengeType = {
	BEDTIME_CONSISTENCY: 'BEDTIME_CONSISTENCY',
	BEDTIME_VARIANCE: 'BEDTIME_VARIANCE',
	SLEEP_DURATION: 'SLEEP_DURATION',
	WAKE_TIME_CONSISTENCY: 'WAKE_TIME_CONSISTENCY',
} as const satisfies Record<SwaggerType, SwaggerType>;

export type ChallengeType = (typeof ChallengeType)[keyof typeof ChallengeType];
