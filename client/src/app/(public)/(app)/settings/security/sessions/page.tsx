import { SettingsSessions } from '@/components/Settings';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Sessions',
};

export default function SessionsPage() {
	return <SettingsSessions />;
}
