import { SettingsNotifications } from '@/components/Settings/SettingsNotifications/SettingsNotifications';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Notifications Settings',
};

export default function NotificationsSettingsPage() {
	return <SettingsNotifications />;
}
