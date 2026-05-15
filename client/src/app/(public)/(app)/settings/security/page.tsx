import { SettingsSecurity } from '@/components/Settings';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Security Settings',
};

export default function SecuritySettingsPage() {
	return <SettingsSecurity />;
}
