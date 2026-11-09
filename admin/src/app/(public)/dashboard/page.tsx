import { Dashboard } from '@/components/Dashboard/Dashboard';
import { PageWrapper } from '@/components/UI';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Dashboard',
};

export default function DashboardPage() {
	return (
		<PageWrapper title="Dashboard" showBackButton={false}>
			<Dashboard />
		</PageWrapper>
	);
}
