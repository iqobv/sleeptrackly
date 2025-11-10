import { PAGES } from '@/config';
import { IconType } from 'react-icons';
import {
	MdOutlineHome,
	MdOutlinePerson,
	MdOutlineReport,
} from 'react-icons/md';

interface NavMenuLinksProps {
	label: string;
	href: string;
	Icon: IconType;
}

export const NAV_MENU_LINKS: NavMenuLinksProps[] = [
	{
		label: 'Home',
		href: PAGES.HOME,
		Icon: MdOutlineHome,
	},
	{
		label: 'Users',
		href: PAGES.USERS,
		Icon: MdOutlinePerson,
	},
	{
		label: 'Reports',
		href: PAGES.REPORTS,
		Icon: MdOutlineReport,
	},
];
