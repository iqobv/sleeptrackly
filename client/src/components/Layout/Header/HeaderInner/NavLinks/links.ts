import { PAGES } from '@/config';

interface Link {
	name: string;
	label: string;
	path: string;
	isAuth: boolean;
	isAdmin?: boolean;
}

export const LINKS: Link[] = [
	{
		name: 'timer',
		label: 'Timer',
		path: PAGES.TIMER,
		isAuth: true,
	},
	{
		name: 'challenges',
		label: 'Challenges',
		path: PAGES.CHALLENGES,
		isAuth: true,
	},
	{
		name: 'shop',
		label: 'Shop',
		path: PAGES.SHOP,
		isAuth: true,
	},
	{
		name: 'dashboard',
		label: 'Dashboard',
		path: PAGES.DASHBOARD,
		isAuth: true,
	},
];
