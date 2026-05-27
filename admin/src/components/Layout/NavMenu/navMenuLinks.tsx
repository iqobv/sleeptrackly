import { PAGES } from '@/config';
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
	label: string;
	href: string;
	Icon: IconType;
	expanded?: boolean;
	innerLinks?: NavMenuLinksProps[];
}

export const NAV_MENU_LINKS: NavMenuLinksProps[] = [
	{
		label: 'Home',
		href: PAGES.HOME,
		Icon: MdOutlineHome,
		expanded: false,
	},
	{
		label: 'Users',
		href: PAGES.USERS,
		Icon: MdOutlinePerson,
		expanded: false,
	},
	{
		label: 'Reports',
		href: PAGES.REPORTS,
		Icon: MdOutlineReport,
		expanded: false,
	},
	{
		label: 'Notifications',
		href: PAGES.NOTIFICATIONS,
		Icon: MdOutlineNotifications,
		expanded: false,
	},
	{
		label: 'Customization',
		href: PAGES.CUSTOMIZATION,
		Icon: MdOutlineShoppingBag,
		expanded: true,
		innerLinks: [
			{
				label: 'Items',
				href: PAGES.ITEMS,
				Icon: MdOutlineShoppingBag,
			},
			{
				label: 'Bundles',
				href: PAGES.BUNDLES,
				Icon: MdOutlineShoppingBag,
			},
			{
				label: 'Products',
				href: PAGES.PRODUCTS,
				Icon: MdOutlineShoppingBag,
			},
		],
	},
	{
		label: 'Promotions',
		href: PAGES.PROMOTIONS,
		Icon: MdCardGiftcard,
		expanded: false,
	},
	{
		label: 'Achievements',
		href: PAGES.ACHIEVEMENTS,
		Icon: MdOutlineEmojiEvents,
		expanded: false,
	},
];
