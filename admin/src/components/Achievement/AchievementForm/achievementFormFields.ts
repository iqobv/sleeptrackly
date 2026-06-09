import { BaseAchievementDto } from '@/dto';
import { AchievementType, Field } from '@/types';
import { capitalize } from '@shared/utils';

export const ACHIEVEMENT_FORM_FIELDS: Field<BaseAchievementDto>[] = [
	{
		name: 'type',
		label: 'Type',
		type: 'select',
		placeholder: 'Select achievement type',
		options: Object.values(AchievementType).map((type) => ({
			label: capitalize(type).split('_').join(' '),
			value: type,
		})),
		required: true,
	},
	{
		name: 'targetValue',
		label: 'Target Value',
		type: 'number',
		placeholder: 'Enter target value',
		required: true,
	},
	{
		name: 'isActive',
		label: 'Is Active',
		type: 'checkbox',
		placeholder: '',
	},
	{
		name: 'isHidden',
		label: 'Is Hidden',
		type: 'checkbox',
		placeholder: '',
	},
	{
		name: 'rewardCoins',
		label: 'Reward Coins',
		type: 'number',
		placeholder: 'Enter reward coins',
	},
];
