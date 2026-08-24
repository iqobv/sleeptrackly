import { SettingsSessions } from '@/components/Settings/SettingsSessions/SettingsSessions';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Sessions',
};

export default function SessionsPage() {
	return <SettingsSessions />;
}
