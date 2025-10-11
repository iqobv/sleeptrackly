import { PAGES } from '@/config';
import { IUser } from '@/types';
import { IconBaseProps } from 'react-icons';
import {
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

export const USER_MENU_LINKS = (user: IUser): Link[] => [
	{
		name: 'profile',
		label: 'Profile',
		path: PAGES.PROFILE(user.username),
		icon: <MdOutlinePerson {...iconProps} />,
	},
	{
		name: 'friends',
		label: 'Friends',
		path: PAGES.FRIENDS,
		icon: <MdPeopleOutline {...iconProps} />,
	},
	{
		name: 'settings',
		label: 'Settings',
		path: PAGES.SETTINGS,
		icon: <MdOutlineSettings {...iconProps} />,
	},
];
