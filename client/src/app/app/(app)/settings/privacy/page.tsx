import { SettingsPrivacy } from '@/components/Settings/SettingsPrivacy/SettingsPrivacy';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Privacy Settings',
};

export default function PrivacySettingsPage() {
	return <SettingsPrivacy />;
}
