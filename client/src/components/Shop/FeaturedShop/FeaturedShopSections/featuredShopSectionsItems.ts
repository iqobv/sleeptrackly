import { ITEM_TYPES } from '@/constants';
import { ItemType } from '@/types';

interface FeaturedShopSectionItem {
	type: ItemType;
	title: string;
}

export const FEATURED_SHOP_SECTIONS_ITEMS: FeaturedShopSectionItem[] = [
	{
		type: ITEM_TYPES.AVATAR_FRAME,
		title: 'Avatar Frames',
	},
	{
		type: ITEM_TYPES.BACKGROUND_IMAGE,
		title: 'Backgrounds',
	},
	{
		type: ITEM_TYPES.MINI_BACKGROUND_IMAGE,
		title: 'Mini Profile Backgrounds',
	},
	{
		type: ITEM_TYPES.ANIMATED_AVATAR,
		title: 'Animated Avatars',
	},
	{
		type: ITEM_TYPES.BADGE,
		title: 'Badges',
	},
	{
		type: ITEM_TYPES.AVATAR,
		title: 'Avatars',
	},
];
