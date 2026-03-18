import { Settings } from '@/components/Settings';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Settings',
};

export default function SettingsPage() {
	return (
		<div className="container">
			<Settings />
		</div>
	);
}
