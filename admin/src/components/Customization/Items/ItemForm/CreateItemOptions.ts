import { ITEM_TYPES } from '@/constants';
import { Option } from '@/types';

export const CREATE_ITEM_OPTIONS: Option<keyof typeof ITEM_TYPES>[] = [
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
