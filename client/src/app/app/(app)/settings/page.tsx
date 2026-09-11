import { SettingsAccount } from '@/components/Settings/SettingsAccount/SettingsAccount';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Settings',
};

export default function SettingsPage() {
	return <SettingsAccount />;
}
