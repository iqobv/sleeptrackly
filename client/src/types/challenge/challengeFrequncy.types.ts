import { CHALLENGE_FREQUENCY } from '@/constants';

export type ChallengeFrequency =
	(typeof CHALLENGE_FREQUENCY)[keyof typeof CHALLENGE_FREQUENCY];
