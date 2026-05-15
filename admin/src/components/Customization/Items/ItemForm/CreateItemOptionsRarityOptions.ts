import { ITEM_RARITIES } from '@/constants';
import { Option } from '@/types';

export const CREATE_ITEM_RARITY_OPTIONS: Option<keyof typeof ITEM_RARITIES>[] =
	[
		{
			value: 'COMMON',
			label: 'Common',
		},
		{
			value: 'UNCOMMON',
			label: 'Uncommon',
		},
		{
			value: 'RARE',
			label: 'Rare',
		},
		{
			value: 'EPIC',
			label: 'Epic',
		},
		{
			value: 'LEGENDARY',
			label: 'Legendary',
		},
	];
