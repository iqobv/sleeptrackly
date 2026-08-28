import { DashboardHeader } from '@/components/Layout/Header/DashboardHeader/DashboardHeader';
import { AuthGuard } from '@/providers/AuthGuard';

export default function AppLayout({ children }: { children: React.ReactNode }) {
	return (
		<AuthGuard>
			<DashboardHeader />
			<main>{children}</main>
		</AuthGuard>
	);
}
