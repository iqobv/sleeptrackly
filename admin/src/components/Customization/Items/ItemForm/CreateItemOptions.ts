import { ItemType } from '@/types/customization/item/itemType.types';
import { Option } from '@/types/ui/option.types';

export const CREATE_ITEM_OPTIONS: Option<ItemType>[] = [
	{
		value: 'AVATAR_FRAME',
		label: 'Avatar Frame',
	},
	{
		value: 'AVATAR',
		label: 'Avatar',
	},
	{
		value: 'ANIMATED_AVATAR',
		label: 'Animated Avatar',
	},
	{
		value: 'BACKGROUND_IMAGE',
		label: 'Background',
	},
	{
		value: 'MINI_BACKGROUND_IMAGE',
		label: 'Mini Background',
	},
	{
		value: 'BADGE',
		label: 'Badge',
	},
];
