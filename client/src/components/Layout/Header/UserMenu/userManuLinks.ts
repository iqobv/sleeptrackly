import { PAGES } from '@/config';

export interface Link {
	name: string;
	label: string;
	path: string;
}

export const USER_MENU_LINKS: Link[] = [
	{
		name: 'settings',
		label: 'Settings',
		path: PAGES.SETTINGS,
	},
];
