import { SettingsSessionsList } from '@/components/Settings';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Sessions',
};

export default function SessionsPage() {
	return (
		<div className="container page">
			<SettingsSessionsList />
		</div>
	);
}
