import { PAGES } from '@/config/pages.config';
import { IconType } from 'react-icons';
import {
	MdCardGiftcard,
	MdOutlineEmojiEvents,
	MdOutlineHome,
	MdOutlineNotifications,
	MdOutlinePerson,
	MdOutlineReport,
	MdOutlineShoppingBag,
} from 'react-icons/md';

export interface NavMenuLinksProps {
	id: string;
	label: string;
	href?: string;
	Icon: IconType;
	expanded?: boolean;
	innerLinks?: NavMenuLinksProps[];
}

export const NAV_MENU_LINKS: NavMenuLinksProps[] = [
	{
		id: 'home',
		label: 'Home',
		href: PAGES.HOME,
		Icon: MdOutlineHome,
		expanded: false,
	},
	{
		id: 'users',
		label: 'Users',
		href: PAGES.USERS,
		Icon: MdOutlinePerson,
		expanded: false,
	},
	{
		id: 'reports',
		label: 'Reports',
		href: PAGES.REPORTS,
		Icon: MdOutlineReport,
		expanded: false,
	},
	{
		id: 'notifications',
		label: 'Notifications',
		href: PAGES.NOTIFICATIONS,
		Icon: MdOutlineNotifications,
		expanded: false,
	},
	{
		id: 'customization',
		label: 'Customization',
		Icon: MdOutlineShoppingBag,
		expanded: true,
		innerLinks: [
			{
				id: 'items',
				label: 'Items',
				href: PAGES.ITEMS,
				Icon: MdOutlineShoppingBag,
			},
			{
				id: 'bundles',
				label: 'Bundles',
				href: PAGES.BUNDLES,
				Icon: MdOutlineShoppingBag,
			},
			{
				id: 'products',
				label: 'Products',
				href: PAGES.PRODUCTS,
				Icon: MdOutlineShoppingBag,
			},
			{
				id: 'collections',
				label: 'Collections',
				href: PAGES.COLLECTIONS,
				Icon: MdOutlineShoppingBag,
			},
		],
	},
	{
		id: 'challenges',
		label: 'Challenges',
		Icon: MdOutlineEmojiEvents,
		expanded: true,
		innerLinks: [
			{
				id: 'all-challenges',
				label: 'All Challenges',
				href: PAGES.CHALLENGES,
				Icon: MdOutlineEmojiEvents,
			},
			{
				id: 'challenge-templates',
				label: 'Templates',
				href: PAGES.CHALLENGE_TEMPLATES,
				Icon: MdOutlineEmojiEvents,
			},
		],
	},
	{
		id: 'promotions',
		label: 'Promotions',
		href: PAGES.PROMOTIONS,
		Icon: MdCardGiftcard,
		expanded: false,
	},
	{
		id: 'achievements',
		label: 'Achievements',
		href: PAGES.ACHIEVEMENTS,
		Icon: MdOutlineEmojiEvents,
		expanded: false,
	},
];
