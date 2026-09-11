import { CreateChallengeDto } from '@/dto/challenge/challenge.dto';
import { ChallengeTier } from '@/types/challenge/challengeTier.types';
import { ChallengeVisibility } from '@/types/challenge/challengeVisibility.types';
import { Field } from '@/types/ui/field.types';

export const CHALLENGE_FIELDS = (
	isCreate: boolean = true,
): Field<CreateChallengeDto>[] => [
	{
		name: 'tier',
		label: 'Tier',
		type: 'select',
		placeholder: 'Select Tier',
		required: isCreate,
		options: Object.values(ChallengeTier).map((tier) => ({
			label: tier,
			value: tier,
			isDefault: false,
			isDisabled: false,
		})),
	},
	{
		name: 'visibility',
		label: 'Visibility',
		type: 'select',
		placeholder: 'Select Visibility',
		required: isCreate,
		options: Object.values(ChallengeVisibility).map((tier) => ({
			label: tier,
			value: tier,
			isDefault: false,
			isDisabled: false,
		})),
	},
	{
		name: 'targetValue',
		label: 'Target Value',
		type: 'number',
		placeholder: 'Enter target value',
		autoComplete: 'off',
		required: isCreate,
	},
	{
		name: 'availableFrom',
		label: 'Available From',
		type: 'datetime-local',
		placeholder: 'Select available from date and time',
		autoComplete: 'off',
		required: isCreate,
	},
	{
		name: 'availableTo',
		label: 'Available To',
		type: 'datetime-local',
		placeholder: 'Select available to date and time',
		autoComplete: 'off',
		required: isCreate,
	},
	{
		name: 'maxRecoveries',
		label: 'Max Recoveries',
		type: 'number',
		placeholder: 'Enter maximum recoveries',
		autoComplete: 'off',
	},
	{
		name: 'durationDays',
		label: 'Duration (days)',
		type: 'number',
		placeholder: 'Enter duration in days',
		autoComplete: 'off',
		required: isCreate,
	},
	{
		name: 'rewardCoins',
		label: 'Reward Coins',
		type: 'number',
		placeholder: 'Enter reward coins',
		autoComplete: 'off',
	},
	{
		name: 'dailyRewardCoins',
		label: 'Daily Reward Coins',
		type: 'number',
		placeholder: 'Enter daily reward coins',
		autoComplete: 'off',
	},
];
