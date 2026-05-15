import { SettingsPrivacy } from '@/components/Settings';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Privacy Settings',
};

export default function PrivacySettingsPage() {
	return <SettingsPrivacy />;
}
