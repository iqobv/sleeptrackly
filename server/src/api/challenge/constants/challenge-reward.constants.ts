import { ChallengeType } from '@generated/prisma/enums';

export const CHALLENGE_ECONOMY_MULTIPLIERS: Record<
	ChallengeType,
	{ baseWeight: number; dailyWeight: number }
> = {
	BEDTIME_CONSISTENCY: {
		baseWeight: 1.5,
		dailyWeight: 1.2,
	},
	BEDTIME_VARIANCE: {
		baseWeight: 1.4,
		dailyWeight: 1.1,
	},
	WAKE_TIME_CONSISTENCY: {
		baseWeight: 1.3,
		dailyWeight: 1.0,
	},
	SLEEP_DURATION: {
		baseWeight: 1.0,
		dailyWeight: 1.0,
	},
};

export const BASE_ECONOMY_RATES = {
	BASE_GRAND_PRIZE: 50,
	BASE_DAILY_REWARD: 10,
	DURATION_MULTIPLIER_PER_DAY: 0.1,
};
