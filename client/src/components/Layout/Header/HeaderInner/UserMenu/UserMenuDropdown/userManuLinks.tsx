import { PAGES, PRIVATE_PAGES } from '@/config';
import { User } from '@/types';
import { IconBaseProps } from 'react-icons';
import {
	MdOutlineEmojiEvents,
	MdOutlineInventory2,
	MdOutlinePerson,
	MdOutlineSettings,
	MdPeopleOutline,
} from 'react-icons/md';

export interface Link {
	name: string;
	label: string;
	path: string;
	icon?: React.ReactNode;
}

const iconProps: IconBaseProps = {
	size: 22,
};

export const USER_MAIN_LINKS = (user: User): Link[] => [
	{
		name: 'profile',
		label: 'Profile',
		path: PAGES.PROFILE(user.username),
		icon: <MdOutlinePerson {...iconProps} />,
	},
	{
		name: 'friends',
		label: 'Friends',
		path: PRIVATE_PAGES.FRIENDS.ALL,
		icon: <MdPeopleOutline {...iconProps} />,
	},
	{
		name: 'inventory',
		label: 'Inventory',
		path: PRIVATE_PAGES.INVENTORY,
		icon: <MdOutlineInventory2 {...iconProps} />,
	},
	{
		name: 'achievements',
		label: 'Achievements',
		path: PRIVATE_PAGES.ACHIEVEMENTS,
		icon: <MdOutlineEmojiEvents {...iconProps} />,
	},
];

export const USER_SYSTEM_LINKS: Link[] = [
	{
		name: 'settings',
		label: 'Settings',
		path: PRIVATE_PAGES.SETTINGS.MAIN,
		icon: <MdOutlineSettings {...iconProps} />,
	},
];
