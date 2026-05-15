import { ItemType, ProductType } from '@/types';

export const shopProductTypeOptions: {
	label: string;
	value: ProductType | 'ALL';
}[] = [
	{ label: 'All', value: 'ALL' },
	{ label: 'Bundles', value: 'BUNDLE' },
	{ label: 'Items', value: 'ITEM' },
];

export const shopItemTypeOptions: { label: string; value: ItemType }[] = [
	{ label: 'Avatars', value: 'AVATAR' },
	{ label: 'Avatar Frames', value: 'AVATAR_FRAME' },
	{ label: 'Animated Avatars', value: 'ANIMATED_AVATAR' },
	{ label: 'Backgrounds', value: 'BACKGROUND_IMAGE' },
	{ label: 'Mini Backgrounds', value: 'MINI_BACKGROUND_IMAGE' },
	{ label: 'Badges', value: 'BADGE' },
];
