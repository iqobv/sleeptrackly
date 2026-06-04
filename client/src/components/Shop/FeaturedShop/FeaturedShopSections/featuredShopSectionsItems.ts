import { ItemType } from '@/types';

interface FeaturedShopSectionItem {
	type: ItemType;
	title: string;
}

export const FEATURED_SHOP_SECTIONS_ITEMS: FeaturedShopSectionItem[] = [
	{
		type: ItemType.AVATAR_FRAME,
		title: 'Avatar Frames',
	},
	{
		type: ItemType.BACKGROUND_IMAGE,
		title: 'Backgrounds',
	},
	{
		type: ItemType.MINI_BACKGROUND_IMAGE,
		title: 'Mini Profile Backgrounds',
	},
	{
		type: ItemType.ANIMATED_AVATAR,
		title: 'Animated Avatars',
	},
	{
		type: ItemType.BADGE,
		title: 'Badges',
	},
	{
		type: ItemType.AVATAR,
		title: 'Avatars',
	},
];
