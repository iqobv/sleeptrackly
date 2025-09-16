import { PAGES } from '@/config';

interface Link {
	name: string;
	label: string;
	path: string;
	isAdmin?: boolean;
}

export const LINKS: Link[] = [
	{
		name: 'home',
		label: 'Home',
		path: PAGES.HOME,
	},
	{
		name: 'timer',
		label: 'Timer',
		path: PAGES.TIMER,
	},
	{
		name: 'challenges',
		label: 'Challenges',
		path: PAGES.CHALLENGES,
	},
	{
		name: 'dashboard',
		label: 'Dashboard',
		path: PAGES.DASHBOARD,
	},
];
