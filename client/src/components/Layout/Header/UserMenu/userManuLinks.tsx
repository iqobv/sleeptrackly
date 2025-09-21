import { PAGES } from '@/config';
import { IconBaseProps } from 'react-icons';
import { MdOutlineSettings } from 'react-icons/md';

export interface Link {
	name: string;
	label: string;
	path: string;
	icon?: React.ReactNode;
}

const iconProps: IconBaseProps = {
	size: 22,
};

export const USER_MENU_LINKS: Link[] = [
	{
		name: 'settings',
		label: 'Settings',
		path: PAGES.SETTINGS,
		icon: <MdOutlineSettings {...iconProps} />,
	},
];
