import { ChallengeTier } from '@generated/prisma/enums';

export interface ChallengeRewardsConfig {
	dailyRewardCoins: number;
	grandPrizeCoins: number;
}

const TIER_DAILY_REWARDS: Record<ChallengeTier, number> = {
	[ChallengeTier.TIER_1]: 5,
	[ChallengeTier.TIER_2]: 10,
	[ChallengeTier.TIER_3]: 15,
	[ChallengeTier.TIER_4]: 12,
};

export const calculateChallengeRewards = (
	tier: ChallengeTier,
	durationDays: number,
): ChallengeRewardsConfig => {
	const dailyRewardCoins = TIER_DAILY_REWARDS[tier];

	let consistencyMultiplier = 1.0;

	if (durationDays >= 21) {
		consistencyMultiplier = 3.0;
	} else if (durationDays >= 14) {
		consistencyMultiplier = 2.0;
	} else if (durationDays >= 7) {
		consistencyMultiplier = 1.5;
	} else {
		consistencyMultiplier = 1.2;
	}

	const baseTotal = dailyRewardCoins * durationDays;
	const grandPrizeCoins = Math.round(baseTotal * consistencyMultiplier);

	return {
		dailyRewardCoins,
		grandPrizeCoins,
	};
};
