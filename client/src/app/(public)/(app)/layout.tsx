import { MainHeader } from '@/components/Layout/Header';

export default function AppLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<MainHeader />
			<main>{children}</main>
		</>
	);
}
