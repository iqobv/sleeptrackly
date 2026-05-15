import { PRIVATE_PAGES } from '@/config';

export interface SettingsTab {
	id: string;
	label: string;
	href: string;
}

export const SETTINGS_TABS: SettingsTab[] = [
	{
		id: 'account',
		label: 'Account',
		href: PRIVATE_PAGES.SETTINGS.MAIN,
	},
	{
		id: 'security',
		label: 'Security',
		href: PRIVATE_PAGES.SETTINGS.SECURITY,
	},
	{
		id: 'notifications',
		label: 'Notifications',
		href: PRIVATE_PAGES.SETTINGS.NOTIFICATIONS,
	},
	{
		id: 'privacy',
		label: 'Privacy',
		href: PRIVATE_PAGES.SETTINGS.PRIVACY,
	},
];
