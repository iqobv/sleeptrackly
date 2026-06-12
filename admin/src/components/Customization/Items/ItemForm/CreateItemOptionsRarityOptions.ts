import { ItemRarity } from '@/types/customization/item/itemRarity.types';
import { Option } from '@/types/ui/option.types';

export const CREATE_ITEM_RARITY_OPTIONS: Option<ItemRarity>[] = [
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
