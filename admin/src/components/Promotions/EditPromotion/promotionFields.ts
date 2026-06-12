import { CreatePromotionDto } from '@/dto/promotion/promotion.dto';
import { Field } from '@/types/ui/field.types';

export const PROMOTIONS_FIELDS: Field<CreatePromotionDto>[] = [
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
