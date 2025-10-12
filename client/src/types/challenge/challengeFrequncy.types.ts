import { CHALLENGE_FREQUENCY } from '@/constants';

export type TChallengeFrequency =
	(typeof CHALLENGE_FREQUENCY)[keyof typeof CHALLENGE_FREQUENCY];
