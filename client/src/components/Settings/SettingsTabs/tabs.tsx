import SettingsAccount from '../SettingsAccount/SettingsAccount';
// import SettingsSecurity from '../SettingsSecurity/SettingsSecurity';

export interface SettingsTab {
	name: string;
	label: string;
	form: React.ReactNode;
}

export const SETTINGS_TABS: SettingsTab[] = [
	{
		name: 'account',
		label: 'Account',
		form: <SettingsAccount />,
	},
	// {
	// 	name: 'security',
	// 	label: 'Security',
	// 	form: <SettingsSecurity />,
	// },
	// {
	// 	name: 'notifications',
	// 	label: 'Notifications',
	// },
];
