import { CreatePromotionDto } from '@/dto';
import { IField } from '@/types';

export const PROMOTIONS_FIELDS: IField<CreatePromotionDto>[] = [
	{
		name: 'alias',
		label: 'Alias',
		type: 'text',
		placeholder: 'Enter alias',
	},
	{
		name: 'coinsReward',
		label: 'Coins Reward',
		type: 'number',
		placeholder: 'Enter coins reward',
	},
	{
		name: 'maxUses',
		label: 'Max Uses',
		type: 'number',
		placeholder: 'Enter max uses',
	},
	{
		name: 'expiresAt',
		label: 'Expires At',
		type: 'datetime-local',
		placeholder: 'Select expiration date',
	},
];
