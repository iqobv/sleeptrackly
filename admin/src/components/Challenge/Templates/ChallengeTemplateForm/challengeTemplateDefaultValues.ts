import { CreateChallengeTemplateDto } from '@/dto/challenge/challengeTemplate.dto';
import { ChallengeTier } from '@/types/challenge/challengeTier.types';
import { ChallengeType } from '@/types/challenge/challengeType.types';
import { DefaultValues } from 'react-hook-form';

export const CHALLENGE_TEMPLATE_DEFAULT_VALUES: DefaultValues<CreateChallengeTemplateDto> =
	{
		isActive: true,
		tier: ChallengeTier.TIER_1,
		type: ChallengeType.SLEEP_DURATION,
		generationRules: {
			durations: [1],
			metadata: {
				minDurationMinutes: [60],
			},
		},
		translations: [
			{
				language: 'en',
				title: '',
				description: '',
			},
		],
	};
