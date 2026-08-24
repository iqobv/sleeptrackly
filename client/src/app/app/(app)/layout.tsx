import { DashboardHeader } from '@/components/Layout/Header/DashboardHeader/DashboardHeader';

export default function AppLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<DashboardHeader />
			<main>{children}</main>
		</>
	);
}
