import { Dashboard } from '@/components/Dashboard';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Dashboard',
};

export default function DashboardPage() {
	return (
		<div className="container">
			<Dashboard />
		</div>
	);
}
