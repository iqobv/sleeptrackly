import { CreateChallengeDto } from '@/dto/challenge/challenge.dto';
import { ChallengeTier } from '@/types/challenge/challengeTier.types';
import { ChallengeType } from '@/types/challenge/challengeType.types';
import { ChallengeVisibility } from '@/types/challenge/challengeVisibility.types';
import { DefaultValues } from 'react-hook-form';

export const CHALLENGE_DEFAULT_VALUES: DefaultValues<CreateChallengeDto> = {
	type: ChallengeType.SLEEP_DURATION,
	metadata: { minDurationMinutes: 60 },
	availableFrom: undefined,
	availableTo: undefined,
	dailyRewardCoins: 0,
	durationDays: 0,
	maxRecoveries: 0,
	rewardCoins: 0,
	rewardProductId: null,
	targetValue: 0,
	tier: ChallengeTier.TIER_1,
	translations: [
		{
			language: 'en',
			title: '',
			description: '',
		},
	],
	visibility: ChallengeVisibility.DRAFT,
};
