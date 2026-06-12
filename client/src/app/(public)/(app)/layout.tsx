import { MainHeader } from '@/components/Layout/Header/MainHeader/MainHeader';

export default function AppLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<MainHeader />
			<main>{children}</main>
		</>
	);
}
