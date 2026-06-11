import { PRIVATE_PAGES } from '@/config/privatePages.config';

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
		path: PRIVATE_PAGES.TIMER,
		isAuth: true,
	},
	{
		name: 'challenges',
		label: 'Challenges',
		path: PRIVATE_PAGES.CHALLENGES.ALL,
		isAuth: true,
	},
	{
		name: 'shop',
		label: 'Shop',
		path: PRIVATE_PAGES.SHOP.FEATURED,
		isAuth: true,
	},
	{
		name: 'dashboard',
		label: 'Dashboard',
		path: PRIVATE_PAGES.DASHBOARD,
		isAuth: true,
	},
];
